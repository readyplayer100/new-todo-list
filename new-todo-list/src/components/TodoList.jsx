import '../App.css';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

  const TaskList = (props) => {
    // 親コンポーネントから受け取った関数を使って、内容を更新
    const onClickDelete = (index) => {
        props.onClickDelete(index);
    };
    // 親コンポーネントから受け取った関数を使って、内容を更新
    const onClickSwitch = (index) => {
        props.onClickSwitch(index);
    };

    return (
        <tbody id="todo-body">  
        {props.filteredTodoList.map((todo, index) => (
          <tr key={'task' + index}>
            <td>{todo.seq}</td>
            {todo.status === "完了"  &&  
               <><td><div className='finished_only'>{todo.comment}</div></td>
               <td><div className='finished_only'>{todo.ddl}</div></td></>
            }
            {todo.status === "作業中" && todo.ddl < props.today_value &&  
               <><td><div className='delay_only'>{todo.comment}</div></td>
               <td><div className='delay_only'>{todo.ddl}</div></td></>
            }
            {todo.status === "作業中" && todo.ddl >= props.today_value &&  
               <><td><div className='in_process'>{todo.comment}</div></td>
               <td><div className='in_process'>{todo.ddl}</div></td></>
            }
            <td><Button type="primary"  value={index}   onClick={(event) => onClickSwitch(index)} >{todo.status}</Button></td>
            <td><Button type="danger"   icon={<DeleteOutlined />}  onClick={(event) => onClickDelete(index)} ></Button></td>
          </tr>
        ))}
        </tbody>

    );
  }
  export default TaskList;