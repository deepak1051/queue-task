import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [value, setValue] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [finishTask, setFinishTask] = useState([]);
  const warnRef = useRef(null);

  useEffect(() => {
    if (taskList.length === 0) {
      return;
    }

    const interval = setInterval(() => {
      console.log("running");
      if (taskList.length === 0) return;

      const popValue = taskList.slice(-1)[0];
      console.log(popValue);
      setFinishTask((prev) => [popValue, ...prev]);
      setTaskList((prev) => prev.filter((t) => t.id !== popValue.id));
    }, 2000);

    return () => clearInterval(interval);
  });
  if (value.trim().length != 0) {
    warnRef.current.innerText = "";
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    if (value.trim().length == 0) {
      warnRef.current.innerText = "Please Enter Some Task";
      return;
    }

    setTaskList((prev) => [...prev, { id: uuidv4(), value }]);
    setValue("");
  };

  const handleEnd = () => {
    if (taskList.length === 0) {
      alert("Success");
    }
  };

  const handleReset = () => {
    setFinishTask([]);
    setTaskList([]);
  };

  return (
    <div className="container mx-auto m-2 max-w-2xl h-screen flex p-4 flex-col sm:flex-row gap-5  justify-center border-2 border-slate-600">
      <div className="flex flex-col flex-1 border-r-2 border-slate-500">
        <form
          onSubmit={handleSubmit}
          className="border-b-2 border-slate-500 pb-10"
        >
          <div className="">
            <input
              className="border-2 rounded border-slate-300 outline-none p-1"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <p className="text-red-600" ref={warnRef}></p>
          </div>
          <button className="bg-teal-500 px-4 py-1 rounded shadow ml-4 text-white font-bold uppercase mt-2">
            Add
          </button>
        </form>

        <ul className="flex flex-col gap-2 py-4">
          {taskList.map((task) => (
            <li
              className="bg-slate-300 rounded p-1 cursor-pointer text-xl"
              key={task.id}
            >
              {task.value}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col flex-1 border-t-2 border-slate-500">
        <ul className="flex flex-col gap-2 py-4">
          {finishTask.map((task) => (
            <li
              className="bg-slate-300 rounded p-1 cursor-pointer text-xl"
              key={task.id}
            >
              {task.value}
            </li>
          ))}
        </ul>

        <div>
          <button
            className="bg-blue-500 px-4 py-1 rounded shadow ml-4 text-white font-bold uppercase"
            onClick={handleEnd}
          >
            End
          </button>
          <button
            className="bg-red-500 px-4 py-1 rounded shadow ml-4 text-white font-bold uppercase"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
