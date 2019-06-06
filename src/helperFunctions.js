export function formatPhoneNumber(pn) {
  if (!parseInt(pn)) return false;
  if (pn.length === 7) return `(510) ${pn.substring(0, 3)}-${pn.substring(3, 7)}`;
  if (pn.length === 11) return `+${pn.substring(0,1)} (${pn.substring(1,4)}) ${pn.substring(4,7)}-${pn.substring(7,11)}`;
  if (pn.length === 12) return `+${pn.substring(0,2)} (${pn.substring(2,5)}) ${pn.substring(5,8)}-${pn.substring(8,12)}`;
  if (pn.length !== 10) return false;
  return `(${pn.substring(0,3)}) ${pn.substring(3,6)}-${pn.substring(6,10)}`;


}
