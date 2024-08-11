import '../App.css';
import React, { useEffect, useState } from "react";
import { Card, Input, Button, Radio, message, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import TaskList from "./TodoList.jsx";
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';

export const TodoMain = () => {
  // todolist
  //设置ddl初始日期为当日
  const today = new Date().toISOString().split('T')[0];

  const [todoText, setTodoText] = useState("");
  const [time, setDeadLine] = useState(today);
  //const [todoList, setNewTodoList] = React.useState([{ id: 1, comment: 'Task001', ddl: '2024-04-30', status: '作業中' }]);
  const [todoList, setNewTodoList] = React.useState([]);
  const [filteredTodoList, setFilteredTodoList] = React.useState([]);
  const [radio, setRadio] = React.useState('all');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  var loginId = 'guest';

  if (sessionStorage.getItem('userId') != null) {
    loginId = sessionStorage.getItem('userId');
  }

  useEffect(() => {
    // 更新DOM
    selectedTodoSet(radio);
  }, [todoList, radio]);

  // 单选按钮更新
  const handleChange = (event) => {
    setRadio(event.target.value);
    //console.log("value=",event.target.value);
    //console.log("radio=",radio);
    //selectedTodoSet(event.target.value);
    return
  }

  const selectedTodoSet = (selRadio) => {
    // 将 ALL 设置为默认值

    // 进行中及完成
    if (selRadio === "incomplete") {
      const incompleteTodoList = [...todoList].filter((todo) => todo.status === "作業中");
      setFilteredTodoList(incompleteTodoList);
    } else if (selRadio === "complete") {
      const completeTodoList = [...todoList].filter((todo) => todo.status === "完了");
      setFilteredTodoList(completeTodoList);
    } else {
      const allTodoList = [...todoList];
      setFilteredTodoList(allTodoList);
    }
    //console.log("fff1=",filteredTodoList.length);
    //console.log("aaa1=",todoList.length);
  }

  // 管理inputform的状态
  const onChangeTodoText = (event) => {
    //alert("text");
    setTodoText(event.target.value);
  };
  const onChangeDeadLine = (event) => {
    //alert("time");
    setDeadLine(event.target.value);
  };

  // 按下确认按钮，将任务添加到待办事项列表中
  const onClickAdd = (event) => {
    if (todoText === "") {
      message.error("Please enter the task content and date.");
      return;
    }

    const todoWithToken = {
      todoList: {
        seq: 0,
        userId: sessionStorage.getItem('userId'),
        comment: todoText,
        ddl: time,
        status: "作業中"
      },
      userId: sessionStorage.getItem('userId'),
      token: sessionStorage.getItem("accessToken")
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(todoWithToken)
    };

    console.error(requestOptions);
    fetch('http://127.0.0.1:8080/add', requestOptions)
      .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();

        // check for error response
        if (!response.ok) {
          message.error('An error has occurred.');
          return;
        }

        console.log(data.seq);
        if (data.seq > 0) {
          const newTodo = {
            seq: data.seq,
            comment: todoText,
            ddl: time,
            status: "作業中"
          }

          // 更新DOM
          todoList.push(newTodo);

          setTodoText("");
          selectedTodoSet(radio);

        } else {
          message.error('There was an error in the DB update!');
        }
      })
      .catch(error => {
        message.error('System error.');
        console.error('There was an error!', error);
      });


  };

  // 削除
  const onClickDelete = (index) => {

    const todoWithToken = {
      todoList: {
        seq: filteredTodoList[index].seq,
        userId: sessionStorage.getItem('userId'),
        comment: filteredTodoList[index].comment,
        ddl: filteredTodoList[index].ddl,
        status: filteredTodoList[index].status
      },
      userId: sessionStorage.getItem('userId'),
      token: sessionStorage.getItem("accessToken")
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(todoWithToken)
    };

    console.error(requestOptions);
    fetch('http://127.0.0.1:8080/delete', requestOptions)
      .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();

        // check for error response
        if (!response.ok) {
          message.error('An error has occurred.');
          return;
        }

        console.error(data.seq);
        if (data.seq === 0) {
          const selSeq = filteredTodoList[index].seq;
          setNewTodoList(
            todoList.filter((todo) => (todo.seq !== selSeq))
          );
          setFilteredTodoList(
            filteredTodoList.filter((todo) => (todo.seq !== selSeq))
          );

        } else {
          message.error('There was an error in the DB update!');
        }
      })
      .catch(error => {
        message.error('System error.');
        console.error('There was an error!', error);
      });


  };

  // 切换状态
  const onClickSwitch = (index) => {

    var selStatus = filteredTodoList[index].status;
    if (selStatus === "作業中") {
      selStatus = "完了";
    } else {
      selStatus = "作業中";
    }

    const todoWithToken = {
      todoList: {
        seq: filteredTodoList[index].seq,
        userId: sessionStorage.getItem('userId'),
        comment: filteredTodoList[index].comment,
        ddl: filteredTodoList[index].ddl,
        status: selStatus
      },
      userId: sessionStorage.getItem('userId'),
      token: sessionStorage.getItem("accessToken")
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(todoWithToken)
    };

    console.error(requestOptions);
    fetch('http://127.0.0.1:8080/update', requestOptions)
      .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();

        // check for error response
        if (!response.ok) {
          message.error('An error has occurred.');
          return;
        }

        console.error(data.seq);
        if (data.seq === 0) {
          const selSeq = filteredTodoList[index].seq;
          const switchTodoList = todoList.map((todo, index) => {
            if (todo.seq === selSeq && todo.status === "作業中") {
              return { ...todo, status: '完了' };
            }
            if (todo.seq === selSeq && todo.status === "完了") {
              return { ...todo, status: '作業中' };
            }
            return todo;
          });
          setNewTodoList(switchTodoList);

        } else {
          message.error('There was an error in the DB update!');
        }
      })
      .catch(error => {
        message.error('System error.');
        console.error('There was an error!', error);
      });

  };

  // import
  const onClickImport = () => {

    const userToken = {
      userId: sessionStorage.getItem("userId"),
      token: sessionStorage.getItem("accessToken")
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(userToken)
    };


    console.error(requestOptions);
    fetch('http://127.0.0.1:8080/getAll', requestOptions)
      .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();

        // check for error response
        if (!response.ok) {
          message.error('An error has occurred.');
          return;
        }

        if (data.userId != null) {
          setNewTodoList(data.allTodoList);
          message.info("已加载列表");
        } else {
          navigate('/');
          setError('加载列表失败');
        }
      })
      .catch(error => {
        message.error('System error.');
        console.error('There was an error!', error);
      });

  };
  

  return (
    <Card title={<div className="card-header">
      <span>In the middle of every difficulty lies opportunity. - Albert Einstein</span>
      <span>当前用户：{loginId}</span>
    </div>} className="todoCard">
      <div className="complete-area">
        <Radio.Group onChange={handleChange} value={radio}>
          <Radio value="all">全部</Radio>
          <Radio value="incomplete">作業中</Radio>
          <Radio value="complete">完了</Radio>
        </Radio.Group>

        <table className="todoTable">
          <thead>
            <tr>
              <td className="seq">SEQ</td>
              <td className="comment">TODO ITEMS</td>
              <td className="ddl">DDL</td>
              <td className="status">STATUS</td>
              <td className="delete">REMOVE</td>
            </tr>
          </thead>
          <TaskList onClickDelete={onClickDelete} onClickSwitch={onClickSwitch} filteredTodoList={filteredTodoList} today_value={today} />
        </table>
      </div>

      <h2 className='enterNew'>Enter new task.</h2>
      <div className="add-todo">
        <Input size="large" className="newTask" placeholder="Please enter the task description here." value={todoText} onChange={onChangeTodoText} />
      </div>

      <h2 className='enterDDL'>Select the deadline for your task.</h2>
      <Row justify="center" align="middle" gutter={16}>
        {/* <Col span={8}>
      <label htmlFor="end" style={{ fontSize: "16px", textAlign: 'right' }}>End date:</label>
    </Col>  */}
        <Col span={8} style={{ margin: '0 auto' }}>
          <input type="date" id="end" name="work ddl" onChange={onChangeDeadLine} defaultValue={time} style={{ width: '100%' }} />
        </Col>
      </Row>

      <div className='space1' />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Row gutter={16}>
          <Button type="primary" onClick={onClickAdd}>CONFIRM</Button>
          <div style={{ width: '20px' }}></div>
          <Button type="primary" shape="round" icon={<UploadOutlined />} onClick={onClickImport}>Load All</Button>
        </Row>
      </div>
    </Card>
  );
}

export default TodoMain;