export default function formatCurrency(num) {
    return "RON " +  Number(num.toFixed(1)).toLocaleString() + " ";
}