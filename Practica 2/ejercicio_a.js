const persona = {
    nombre: "Gerardo",
    edad: 20,
    direccion: {
        ciudad: "Pedro Escobedo",
        pais: "MX",
    }
};

const { nombre, edad, direccion: { ciudad } } = persona;

console.log(`Me llamo ${nombre}, tengo ${edad} años y vivo en ${ciudad}.`);