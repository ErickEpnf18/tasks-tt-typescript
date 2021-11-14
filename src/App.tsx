import { useState, useRef } from 'react';
import 'bootswatch/dist/vapor/bootstrap.min.css';

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}
function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>('');
  const [tasks, setTasks] = useState<ITask[]>([]);
  // useRef --> useful to do fastly reference to the input
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask('');
    taskInput.current?.focus();
    console.log(tasks);
    // console.log("Submitting");
  };

  const addTask = (name: string) => {
    const newTasks = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toggleDoneTask = (i: number) => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  };

  const removeTask = (i: number) => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i, 1); // remove
    setTasks(newTasks);
  };
  return (
    <div className='container p-4'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <div className='card'>
            <div className='card-body'>
              <div className='card'>
                <div className='card-body'>
                  <form onSubmit={handleSubmit}>
                    <input
                      type='text'
                      onChange={(e) => setNewTask(e.target.value)}
                      value={newTask}
                      className='form-control'
                      ref={taskInput}
                      autoFocus
                    />
                    <button className='btn btn-success btn-block mt-2'>
                      Save
                    </button>
                  </form>
                </div>
              </div>

              {tasks.map((t: ITask, i: number) => (
                <div className='card card-body' key={i}>
                  <h2 style={{ textDecoration: t.done ? 'line-through' : '' }}>
                    {t.name}
                  </h2>
                  <button
                    className='btn btn-secondary'
                    onClick={() => toggleDoneTask(i)}
                  >
                    {t.done ? '✅' : '✗'}
                  </button>
                  <button
                    className='btn btn-success'
                    onClick={() => removeTask(i)}
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
