import React, { useEffect, useState } from "react";

function Properties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Dummy data (later you can replace with API call)
    const demoData = [
      {
        id: 1,
        title: "2BHK Apartment",
        location: "Gurgaon",
        price: "₹45,00,000",
      },
      {
        id: 2,
        title: "3BHK Villa",
        location: "Noida",
        price: "₹1,20,00,000",
      },
      {
        id: 3,
        title: "Studio Apartment",
        location: "Delhi",
        price: "₹30,00,000",
      },
    ];

    setProperties(demoData);
  }, []);

  return (
    <div style={styles.container}>
      <h2>Properties</h2>

      <div style={styles.list}>
        {properties.map((item) => (
          <div key={item.id} style={styles.card}>
            <h3>{item.title}</h3>
            <p>📍 {item.location}</p>
            <p>💰 {item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial",
  },
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    marginTop: "20px",
  },
  card: {
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 0 8px rgba(0,0,0,0.1)",
    background: "white",
  },
};

export default Properties;