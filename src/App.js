import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Label, Input, Button } from 'reactstrap';
import api from './api';

function App() {
  const [botoes, setBotoes] = useState([]);
  //const [registros, setRegistros] = useState([]);

  //chamado após montar o componente
  useEffect(async () => {
    const { data } = await api.get('/list');
    console.log(data);
    let temp = [],
      resultado = [],
      nro,
      count;
    for (let i = 0; i < 5; i++) {
      nro = parseInt(Math.random() * 9 + 1);
      if (temp.includes(nro)) {
        i--;
      } else {
        count = 0;
        temp.push(nro);
        
        for (let j = 0; j < data.registros.length; j++) {
          if (nro === data.registros[j].number) {
            count = data.registros[j].count;
            break;
          }
        }
        resultado.push({ number: temp[i], count: count });
      }
    }
    setBotoes(resultado);
  }, []);

  const temp = botoes.map((item) => (
    <Button color="primary" size="sm" key={item.number}>
      {item.number}:{item.count}
    </Button>
  ));

  

  return (
    <Container>
      <Row>
        <Col>{temp}</Col>
      </Row>
    </Container>
  );
}
export default App;
