import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useGetGradesQuery } from '../slices/gradesApiSlice.js';
import '../assets/styles/index.css'; // Asegúrate de que la ruta sea correcta

const HomeScreen = () => {
  const { data: grades, isLoading, error } = useGetGradesQuery();

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <div>{error?.data?.message || error.error}</div>;

  return (
    <>
      <h1>Grades</h1>
      <Row>
        <Col xs={12}>
          <table className="customTable customTableStriped customTableHover"> {/* Usa las nuevas clases */}
            <thead>
              <tr>
                <th>User ID</th> {/* Cambia a User Name si tienes los nombres disponibles */}
                <th>Grade</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {grades.map(grade => (
                <tr key={grade._id}>
                  <td>{grade.user.name}</td> 
                  <td>{grade.grade}</td>
                  <td>{new Date(grade.startDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </>
  );
};

export default HomeScreen;

/*const[grades,setGrades]=useState([]);

    useEffect(()=>{
        const fetchGrades=async()=>{
            const{data}=await axios.get('/api/grades');
            setGrades(data);
        };
        fetchGrades();
    },[])*/