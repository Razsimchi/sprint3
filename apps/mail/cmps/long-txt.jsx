export function LongTxt({ txt, length = 40 }) {
  
    function getTxtToShow() {
      if (txt.length < length) return txt
      else {
         return txt.substring(0, length) + '...'
      }
    }
  
    return (
        <span>
        {getTxtToShow()}
        </span>
    )
  }