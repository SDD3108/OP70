import { formatPrice } from "@/src/utils/formatters";

const CartSummary = ({subtotal, discount, total, count}) => (
  <div className="space-y-3 text-sm">
    <div className="flex justify-between">
      <span className="text-muted-foreground">Билеты ({count})</span>
      <span>{formatPrice(subtotal)}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-muted-foreground">Скидка</span>
      <span className="text-green-700">−{formatPrice(discount)}</span>
    </div>
    <div className="flex items-center justify-between border-t pt-4 text-base">
      <span className="font-semibold">Итого</span>
      <strong className="text-2xl">{formatPrice(total)}</strong>
    </div>
  </div>
);

export default CartSummary;
