// Row 8 · Step 2 (final) — no state of its own. The parent owns `count` and passes
// it down together with the click handler, so every ReportCounter shows the same number.
//
// Step 1 (done first, then replaced) looked like this — each button counted on its own:
//
//   import { useState } from 'react';
//   export default function ReportCounter() {
//     const [count, setCount] = useState(0);
//     return (
//       <button className="btn btn-outline" onClick={() => setCount(count + 1)}>
//         I've seen this too ({count})
//       </button>
//     );
//   }
export default function ReportCounter({ count, onClick }) {
  return (
    <button className="btn btn-outline" onClick={onClick}>
      I've seen this too ({count})
    </button>
  );
}
