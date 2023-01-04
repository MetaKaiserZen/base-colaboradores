import { useState } from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Form, Row, Col, Card, Button } from 'react-bootstrap';

const Formulario = ({ colaboradores }) =>
{
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');

    const [lista, setLista] = useState(colaboradores);

    const [filtro, setFiltro] = useState('');

    const [errorNombre, setErrorNombre] = useState(false);
    const [errorCorreo, setErrorCorreo] = useState(false);

    const filtrarColaborador = (e) =>
    {
        setFiltro(e);
    }

    const capturarNombre = (e) =>
    {
        setNombre(e.target.value);
    }

    const capturarCorreo = (e) =>
    {
        setCorreo(e.target.value);
    }

    const enviarFormulario = (e) =>
    {
        e.preventDefault();

        if (nombre !== '' && correo !== '')
        {
            setErrorNombre(false);
            setErrorCorreo(false);

            alert('Enviando...');

            const incremental = lista.length != 0 ? lista[lista.length - 1]['id'] + 1 : 1;

            setLista([...lista,
            {
                id: incremental,
                nombre: nombre,
                correo: correo,
                activo: true
            }]);

            setNombre('');
            setCorreo('');
        }
        else
        {
            nombre !== '' ? setErrorNombre(false) : setErrorNombre(true);
            correo !== '' ? setErrorCorreo(false) : setErrorCorreo(true);
        }
    }

    const desactivarColaborador = (id) =>
    {
        const nuevosColaboradores = [...lista];

        const index = nuevosColaboradores.findIndex(colaborador => colaborador.id === id);

        nuevosColaboradores[index].activo = false;

        setLista(nuevosColaboradores);
    }

    const eliminarColaborador = (id) =>
    {
        const listaFiltrada = lista.filter(colaborador => colaborador.id !== id);

        setLista(listaFiltrada);
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid>
                    <Navbar.Brand>Buscador de Colaboradores</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">

                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        />

                        <Form className="d-flex">
                            <Form.Control
                                type="text"
                                placeholder="Buscar"
                                className="me-2"
                                onChange={(e) => filtrarColaborador(e.target.value)}
                            />
                        </Form>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container style={{ marginBlock: '1em' }}>

                <Form onSubmit={enviarFormulario}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre del Colaborador</Form.Label>
                        <Form.Control
                            type="text"
                            isInvalid={ errorNombre ? "true" : ""}
                            name="nombre"
                            onChange={capturarNombre}
                            value={nombre}
                            placeholder="Agregar el nombre"
                            autoComplete="off"
                        />
                        { errorNombre ?
                        <Form.Text className="text-danger">
                            El nombre es obligatorio.
                        </Form.Text> : null}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Correo del Colaborador</Form.Label>
                        <Form.Control
                            type="email"
                            isInvalid={ errorCorreo ? "true" : ""}
                            name="correo"
                            onChange={capturarCorreo}
                            value={correo}
                            placeholder="Agregar el correo"
                            autoComplete="off"
                        />
                        { errorCorreo ?
                        <Form.Text className="text-danger">
                            El correo es obligatorio.
                        </Form.Text> : null}
                    </Form.Group>
                    <Button type="submit" variant="outline-success">Agregar</Button>
                </Form>

                <Row md="4">
                    {lista.filter((e) => e.nombre.toLowerCase().includes(filtro)).map((colaborador) =>
                    <Col key={colaborador.id}>
                        <Card bg={colaborador.activo === true ? "light" : ""} border="dark" style={{ marginBlock: '2em' }}>
                            <Card.Header>Tarjeta de Colaborador</Card.Header>
                            <Card.Body>
                                <Card.Title>{colaborador.id} | {colaborador.nombre}</Card.Title>
                                <Card.Text>{colaborador.correo}</Card.Text>
                                {colaborador.activo === true ?
                                <Button
                                    type="button"
                                    variant="outline-warning"
                                    onClick={() => desactivarColaborador(colaborador.id)}
                                    style={{ marginInline: '0.5em' }}
                                >Desactivar</Button> : ''}
                                {colaborador.activo === false ?
                                <Button
                                    type="button"
                                    variant="outline-danger"
                                    onClick={() => eliminarColaborador(colaborador.id)}
                                    style={{ marginInline: '0.5em' }}
                                >Eliminar</Button> : ''}
                            </Card.Body>
                        </Card>
                    </Col>)}
                </Row>

            </Container>
        </div>
    );
}

export default Formulario;
