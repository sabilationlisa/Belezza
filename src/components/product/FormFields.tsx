import { forwardRef, type ReactNode } from "react";
import { formatUnitPrice } from "../../lib/pricing";
import type { Variant } from "../../types/product";
import { CheckIcon } from "../ui/Icons";

const inputBase =
  "w-full rounded-xl border bg-white text-base text-ink placeholder:text-slate-400 focus:outline-none focus:ring-4 transition-colors";
const inputOk = "border-line focus:border-primary focus:ring-blue-100";
const inputErr = "border-red-500 focus:border-red-500 focus:ring-red-100";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-red-600">
      {message}
    </p>
  );
}

// ── Pilihan varian (radio — dapat dioperasikan dengan keyboard/panah) ──

interface VariantSelectorProps {
  name: string;
  legend: string;
  variants: Variant[];
  unit?: string;
  value: string | null;
  onChange: (id: string) => void;
}

export function VariantSelector({ name, legend, variants, unit, value, onChange }: VariantSelectorProps) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-ink">{legend}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {variants.map((v) => {
          const checked = v.id === value;
          return (
            <label
              key={v.id}
              className={`relative flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-3.5 transition-colors has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-blue-100 ${
                checked ? "border-primary bg-blue-50/60" : "border-line bg-white hover:border-slate-300"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={v.id}
                checked={checked}
                onChange={() => onChange(v.id)}
                className="sr-only"
              />
              <span>
                <span className="block text-sm font-semibold text-ink">{v.name}</span>
                <span className="block text-sm text-muted">{formatUnitPrice(v.price, unit)}</span>
              </span>
              <span
                aria-hidden="true"
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                  checked ? "border-primary bg-primary text-white" : "border-slate-300 bg-white"
                }`}
              >
                {checked && <CheckIcon width={12} height={12} strokeWidth={3} />}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

// ── Input angka (ukuran) ───────────────────────────────────────────────

interface NumberFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  suffix?: string;
  placeholder?: string;
  decimal?: boolean;
}

export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(function NumberField(
  { id, label, value, onChange, onBlur, error, suffix, placeholder, decimal = false },
  ref,
) {
  const errId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      <div className="relative">
        <input
          ref={ref}
          id={id}
          type="text"
          inputMode={decimal ? "decimal" : "numeric"}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errId : undefined}
          className={`${inputBase} ${error ? inputErr : inputOk} h-12 px-4 ${suffix ? "pr-12" : ""}`}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted">{suffix}</span>
        )}
      </div>
      <FieldError id={errId} message={error} />
    </div>
  );
});

// ── Input jumlah dengan tombol − / + ──────────────────────────────────

interface QuantityFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
}

export const QuantityField = forwardRef<HTMLInputElement, QuantityFieldProps>(function QuantityField(
  { id, label, value, onChange, onBlur, error },
  ref,
) {
  const errId = `${id}-error`;
  const current = /^\d+$/.test(value.trim()) ? Number(value) : 0;
  const step = (delta: number) => onChange(String(Math.max(1, current + delta)));
  const stepBtn =
    "grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-line bg-white text-xl font-semibold text-ink hover:bg-slate-50 disabled:opacity-40";

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      <div className="flex gap-2">
        <button type="button" className={stepBtn} onClick={() => step(-1)} disabled={current <= 1} aria-label="Kurangi jumlah">
          −
        </button>
        <input
          ref={ref}
          id={id}
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errId : undefined}
          className={`${inputBase} ${error ? inputErr : inputOk} h-12 px-4 text-center font-semibold`}
        />
        <button type="button" className={stepBtn} onClick={() => step(1)} aria-label="Tambah jumlah">
          +
        </button>
      </div>
      <FieldError id={errId} message={error} />
    </div>
  );
});

// ── Teks bebas (kebutuhan & catatan) ──────────────────────────────────

interface TextFieldProps {
  id: string;
  label: ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
}

export function TextField({ id, label, value, onChange, placeholder, multiline = false }: TextFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          rows={3}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputBase} ${inputOk} resize-y px-4 py-3`}
        />
      ) : (
        <input
          id={id}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputBase} ${inputOk} h-12 px-4`}
        />
      )}
    </div>
  );
}
