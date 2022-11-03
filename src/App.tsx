import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { Checkbox } from './components/Checkbox';

export interface ITodo {
  description: string;
  completed: boolean;
  id: string;
}

function App() {
  const [todo, setTodo] = useState<ITodo[]>([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const storageInfo = localStorage.getItem('todos');
  const storedTodos = storageInfo?.length! > 0 && JSON.parse(storageInfo!);

  function addTodo() {
    if (!input) return console.error('Favor preencher algo');
    setTodo((prev) => [
      ...prev,
      {
        description: input,
        completed: false,
        id: v4(),
      },
    ]);
    setInput('');
  }

  function completeToDo(id: string) {
    setTodo((prev) => {
      const newState = prev.map((obj) => {
        if (obj.id === id) {
          return { ...obj, completed: !obj.completed };
        }
        return obj;
      });
      return newState;
    });
    const updatedStorage = todo.map((obj: ITodo) => {
      if (obj.id === id) {
        return { ...obj, completed: !obj.completed };
      }
      return obj;
    });
    localStorage.setItem('todos', JSON.stringify(updatedStorage));
  }

  function displayTodos(filter: string) {
    if (filter === 'all') return todo;
    if (filter === 'active') return activeTodos;
    if (filter === 'completed') return completedTodos;
  }

  function deleteTodo(id: string) {
    setTodo((current) => current.filter((obj) => obj.id !== id));
    storedTodos.filter((obj: ITodo) => obj.id !== id);
  }

  function deleteAll() {
    setTodo((current) => current.filter((obj) => obj.completed !== true));
    storedTodos.filter((obj: ITodo) => obj.completed !== true);
  }

  const activeTodos = todo.filter((element) => element.completed === false);
  const completedTodos = todo.filter((element) => element.completed === true);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todo));
  }, [todo.length]);

  useEffect(() => {
    if (!storedTodos) return;
    setTodo(storedTodos);
  }, []);
  return (
    <div className='min-h-screen'>
      <header className='text-gray-700 font-raleway text-4xl pt-8 text-center'>
        #todo
      </header>
      <main className='font-montSerrat flex flex-col mx-auto mt-16 max-w-xl w-full text-center gap-5 min-h-[calc(100vh-220px)]'>
        <nav className='flex list-none justify-around text-gray-700 border-b border-gray-200 font-semibold'>
          <li
            id={`${filter === 'all' ? 'hover' : 'nav_hover'}`}
            className='p-5 cursor-pointer'
            onClick={() => setFilter('all')}
          >
            All
          </li>
          <li
            id={`${filter === 'active' ? 'hover' : 'nav_hover'}`}
            className='p-5 cursor-pointer'
            onClick={() => setFilter('active')}
          >
            Active
          </li>
          <li
            id={`${filter === 'completed' ? 'hover' : 'nav_hover'}`}
            className='p-5 cursor-pointer'
            onClick={() => setFilter('completed')}
          >
            Completed
          </li>
        </nav>
        <div className='flex gap-6 w-full'>
          <input
            type='text'
            className='flex-1 px-3 py-5 outline-none border border-gray-200 rounded-xl'
            placeholder='add details'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className='py-5 px-10 bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-500/80'
            onClick={addTodo}
          >
            Add
          </button>
        </div>
        <section className='flex flex-col gap-5 font-montSerrat font-medium'>
          {todo &&
            displayTodos(filter)?.map(({ id, description, completed }) => (
              <Checkbox
                key={id}
                description={description}
                id={id}
                completed={completed}
                complete={completeToDo}
                deleteTodo={deleteTodo}
                filter={filter}
              />
            ))}
          {filter === 'completed' && completedTodos.length > 0 && (
            <button
              onClick={deleteAll}
              className='flex gap-2 items-center self-end bg-red rounded max-w-fit py-3 px-4 text-white'
            >
              <span className='material-symbols-outlined cursor-pointer'>
                delete
              </span>
              delete all
            </button>
          )}
        </section>
      </main>
      <footer className='text-center py-6 mx-auto text-gray-500'>
        created by <span className='font-bold underline'>Sérgio Valério</span> -
        devChallenges.io{' '}
      </footer>
    </div>
  );
}

export default App;
