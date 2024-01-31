import React from 'react';
import PropTypes from 'prop-types';
import { useGetGradesQuery,useGetUserDetailsQuery } from '../slices/userApiSlice.js';

const Grade = ({ grade }) => {
  
  const { data: user, isFetching } = useGetUserDetailsQuery(grade.user);

  if (isFetching) return <div>Cargando...</div>;

  return (
    <table>
      <tbody>
        <tr>
          <th>User</th>
          <td>{user ? user.name : 'Usuario no encontrado'}</td>
        </tr>
        <tr>
          <th>Grade</th>
          <td>{grade.grade}</td>
        </tr>
        <tr>
          <th>Start Date</th>
          <td>{new Date(grade.startDate).toLocaleDateString()}</td>
        </tr>
        <tr>
          <th>End Date</th>
          <td>{new Date(grade.endDate).toLocaleDateString()}</td>
        </tr>
      </tbody>
    </table>
  );
};

Grade.propTypes = {
  grade: PropTypes.object.isRequired,
};

export default Grade;
