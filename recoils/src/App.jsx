import { firstState } from "./store/atoms/count";
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { evenOddCheck } from "./store/atoms/selector";


function App() {

  return (
    <div>
      <RecoilRoot>
        <Count />
      </RecoilRoot>
    </div>
  );
}

function Count() {
  return (
    <div>
      <CountRenderer />
      <Buttons />
    </div>
  );
}

function CountRenderer() {
  const count = useRecoilValue(firstState);
  return <div>{count}</div>;
}

function Buttons() {
  // const [count, setCount] = useRecoilState(firstState);
  const setCount = useSetRecoilState(firstState)
  const evenOdd = useRecoilValue(evenOddCheck)
  return (
    <div>
      <button
        onClick={() => {
          setCount(count => count + 1);
        }}
      >
        Increase
      </button>

      <button
        onClick={() => {
          setCount(count => count - 1);
        }}
      >
        Decrease
      </button>
      <div>
        {evenOdd}
      </div>
    </div>
  );
}

export default App;
