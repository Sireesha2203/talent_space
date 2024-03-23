import React from 'react'
import { Table } from 'react-bootstrap';

function Funds() {
    const projects = [
        { id: 1, name: 'ecommerce app dev', budget: 10000, availableFunds: 8000 },
        { id: 2, name: 'Recommendation sys', budget: 5000, availableFunds: 2500 },
        { id: 3, name: 'Save The Tigers', budget: 15000, availableFunds: 12000 },
      ];
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Budget</th>
          <th>Available Funds</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>{project.budget}</td>
            <td>{project.availableFunds}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default Funds