import { useEffect, useState } from 'react';
import { getSocios, crearSocio } from '../api/socios';

export default function Socios() {
  const [socios, setSocios] = useState([]); 
  const [nombre, setNombre] = useState('');
  const [dni, setDni] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    getSocios().then((res) =>{   
      console.log('Respuesta API socios:', res.data);
      setSocios(res.data.data)});
  }, []);

  const handleCrear = async () => {
    await crearSocio({ nombre, dni, telefono, email });
    const res = await getSocios();
    setSocios(res.data);
    setNombre('');
    setDni('');
    setTelefono('');
    setEmail('');
  };

  return (
    <div>
      <h2>SOCIOS</h2>

      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre del socio"
      />
      <input
        placeholder="DNI"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
      />

      <input
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleCrear}>Crear</button>

      <ul>
        {socios.map((s) => (
          <li key={s.id}>{s.nombre}{s.dni}{s.telefono}{s.email}</li>
        ))}
      </ul>
    </div>
  );
}
