interface IProps {
  description: string;
  completed: boolean;
  id: string;
  complete: (id: string) => void;
  deleteTodo: (id: string) => void;
  filter: 'all' | 'active' | 'completed';
}

export function Checkbox({
  id,
  description,
  completed,
  complete,
  deleteTodo,
  filter,
}: IProps) {
  return (
    <>
      <div key={id} className='flex justify-between gap-2 place-items-center'>
        <div className='flex items-center gap-2'>
          <input
            type='checkbox'
            id={description}
            className='h-6 w-6'
            checked={completed}
            onChange={() => complete(id)}
          />
          <label
            className={
              completed === true ? 'select-none line-through' : 'select-none'
            }
            htmlFor={description}
          >
            {description}
          </label>
        </div>
        {filter === 'completed' && (
          <span
            onClick={() => deleteTodo(id)}
            className='material-symbols-outlined text-gray-200 cursor-pointer'
          >
            delete
          </span>
        )}
      </div>
    </>
  );
}
