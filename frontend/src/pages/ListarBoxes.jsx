import { useEffect, useState } from 'react';
import { getBoxes } from '../api/boxes.js';
import { EntityTable } from '../components/TablaGenerica.jsx';
import { CCard, CCardBody, CCardHeader, CRow, CCol } from '@coreui/react';

export default function ListarBoxes() {
  const [boxes, setBoxes] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [boxesFiltrados, setBoxesFiltrados] = useState([]);

  useEffect(() => {
    cargarBoxes();
  }, []);

  useEffect(() => {
    filtrarBoxes();
  }, [boxes, filtroEstado]);

  const cargarBoxes = async () => {
    try {
      const res = await getBoxes();
      setBoxes(res.data.data || []);
    } catch (error) {
      console.error('Error al cargar boxes:', error);
    }
  };

  const filtrarBoxes = () => {
    if (filtroEstado === 'todos') {
      setBoxesFiltrados(boxes);
    } else {
      setBoxesFiltrados(boxes.filter(box => box.estado === filtroEstado));
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-4">Listado de Boxes</h2>
      
      <CCard className="mb-4">
        <CCardHeader>
          <h5>Filtros</h5>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <div className="mb-3">
                <label className="form-label">Filtrar por Estado</label>
                <select
                  className="form-select"
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}
                >
                  <option value="todos">Todos los estados</option>
                  <option value="disponible">Disponible</option>
                  <option value="ocupado">Ocupado</option>
                  <option value="mantenimiento">Mantenimiento</option>
                </select>
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      {boxes == null ? (
        <div className="text-center p-4 border rounded">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando boxes...</p>
        </div>
      ) : !Array.isArray(boxes) ? (
        <div className="alert alert-warning">
          <strong>Error:</strong> Los datos no son un array válido.
          <br />
          <small>Tipo recibido: {typeof boxes}</small>
        </div>
      ) : boxes.length === 0 ? (
        <div className="text-center p-4 border rounded">
          <h5>No hay boxes registrados</h5>
          <p className="text-muted">
            No se encontraron boxes en el sistema.
          </p>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              {filtroEstado !== 'todos' && (
                <span className="text-muted">
                  Mostrando boxes en estado: <strong>{filtroEstado}</strong>
                </span>
              )}
            </div>
            <div>
              <span className="text-muted">
                Total: <strong>{boxesFiltrados.length}</strong> boxes
              </span>
            </div>
          </div>

          <EntityTable
            entityName="box"
            entityNamePlural="boxes"
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'nroBox', label: 'Número de Box' },
              { key: 'estado', label: 'Estado' },
              { key: 'precioMensualBase', label: 'Precio Mensual' }
            ]}
            data={boxesFiltrados}
            readOnly={true}
            className="tabla-boxes"
          />
        </>
      )}
    </div>
  );
}