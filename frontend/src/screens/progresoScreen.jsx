import React from 'react';
import { useState, useEffect } from 'react';
import { useGetWeightedProgressQuery } from '../slices/progresoApiSlice.js';

// Esta función consolidará los datos de progreso en un solo objeto por usuario
const consolidateProgressData = (progressData) => {
  const passingScore = 6; // Definir la nota de aprobación
  const usersProgress = {};

  progressData.forEach(item => {
    const { name } = item;
    if (!usersProgress[name]) {
      usersProgress[name] = { name, 'Progreso 1': 'N/A', 'Progreso 2': 'N/A', 'Progreso 3': 'N/A', 'Needed for Passing': 'N/A' };
    }

    Object.keys(item).forEach(key => {
      if (key.includes('Progreso')) {
        const progresoNum = key.split(' ')[2];
        usersProgress[name][`Progreso ${progresoNum}`] = parseFloat(item[key]).toFixed(2);
      }
    });

    // Si Progreso 3 es 'N/A', calcular lo necesario para aprobar
    if (usersProgress[name]['Progreso 3'] === 'N/A') {
      const progreso1 = parseFloat(usersProgress[name]['Progreso 1']) || 0;
      const progreso2 = parseFloat(usersProgress[name]['Progreso 2']) || 0;
      const neededForPassing = passingScore - (progreso1 + progreso2);

      // Si el resultado es mayor que 0, se muestra. Si no, se muestra 'Extra effort needed' o un mensaje similar.
      usersProgress[name]['Needed for Passing'] = neededForPassing > 0 ? neededForPassing.toFixed(2) : 'Extra effort needed';
    }
  });

  return Object.values(usersProgress);
};

// Función para determinar la clase basada en el progreso y la nota necesaria
const getProgressClassName = (progreso, neededForPassing) => {
  if (progreso === 'N/A') return 'progreso-red';
  const progressValue = parseFloat(progreso);
  const neededValue = parseFloat(neededForPassing);

  if (progressValue > neededValue) return 'progreso-green';
  if (progressValue === neededValue) return 'progreso-yellow';
  return 'progreso-red'; // Caso en que la nota de progreso sea menor que la necesaria para aprobar
};

const ProgresoScreen = () => {
  const {
    data: userProgress,
    isLoading,
    isError,
    error
  } = useGetWeightedProgressQuery();
  const [filter, setFilter] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  // Consolidar los datos de progreso antes de renderizarlos
  const consolidatedData = isLoading || isError ? [] : consolidateProgressData(userProgress);
  
  const handleFilter = () => {
    if (userProgress && !isLoading && !isError) {
      const consolidated = consolidateProgressData(userProgress);
      const filtered = consolidated.filter(user => user.name.toLowerCase().includes(filter.toLowerCase()));
      setFilteredData(filtered);
    }
  };

  // Esta función se ejecuta cuando el componente se monta y cada vez que userProgress cambia
  React.useEffect(() => {
    if (userProgress && !isLoading && !isError) {
      setFilteredData(consolidateProgressData(userProgress));
    }
  }, [userProgress, isLoading, isError]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.toString()}</div>;

  // Renderizado de la tabla con datos de progreso consolidados
  return (
    <div>
      <h1>Weighted Progress</h1>
      <div>
        <input
          type="text"
          placeholder="Search user..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button onClick={handleFilter}>Filtrar</button>
      </div>
      <table className="customTable">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Progreso 1</th>
            <th>Progreso 2</th>
            <th>Progreso 3</th>
            <th>Necesita para pasar el progreso 3</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user['Progreso 1']}</td>
              <td>{user['Progreso 2']}</td>
              <td className={`${getProgressClassName(user['Progreso 3'], user['Needed for Passing'])} bold-text`}>
                {user['Progreso 3']}
              </td>
              <td>{user['Needed for Passing']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProgresoScreen;
