import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Municipios() {
  const [municipios, setMunicipios] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("municipios")
        .select("*")
        .order("nome", { ascending: true });

      if (!error) {
        setMunicipios(data);
      }
    }

    load();
  }, []);

  const filtrados = municipios.filter((m) =>
    m.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>Municípios</h1>

      <input
        type="text"
        placeholder="Buscar..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        style={{
          padding: 10,
          marginBottom: 20,
          borderRadius: 8,
          width: "100%",
          maxWidth: 300,
        }}
      />

      <ul>
        {filtrados.map((m) => (
          <li key={m.id}>{m.nome}</li>
        ))}
      </ul>
    </div>
  );
}
