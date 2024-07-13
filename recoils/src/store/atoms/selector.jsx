import { selector } from "recoil";
import { firstState } from "./count";

export const evenOddCheck = selector({
  key: 'evenOddCheck',
  get: ({ get }) => {
    const evenOdd = get(firstState);
    if (evenOdd % 2 === 0) {
      return <div>
        It is even.
      </div>
    } else {
      return <div>
        It is odd.
      </div>
    }

  }
})
