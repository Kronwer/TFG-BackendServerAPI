const request = require("supertest")
const app = require('../server');

const newBuilding = {
    name: "Test Building",
    floors: 5,
    latitude: 39.48067057885303,
    longitude: -0.3398773008264785
}

beforeAll(async () => {
    // Populate database with one building
    await request(app).post("/buildings").send(newBuilding);
});

describe("GET /buildings", () => {

    // Check correct functionality

    // HTTP Request
    let response;

    beforeAll(async () => {
        response = await request(app).get("/buildings");
    });

    it("returns 200", async () => {
        expect(response.statusCode).toBe(200);
    });

    it("returns the array of buildings", async () => {
        expect(response.body.length >= 1).toBe(true);
    });

});

describe("POST /buildings", () => {

    const postBuilding = {
        name: "Test Building POST",
        floors: 2,
        latitude: 39.48067057885303,
        longitude: -0.3398773008264785
    }

    // HTTP Request
    let response;

    beforeAll(async () => {
        response = await request(app).post("/buildings").send(postBuilding);
    });

    // Check correct functionality

    it("returns 200", async () => {
        expect(response.statusCode).toBe(200);
    });

    it("returns JSON", async () => {
        expect(response.header["content-type"]).toEqual(expect.stringContaining("json"));
    });

    it("returns success message", async () => {
        expect(response.body.message).toBe('Building added succesfully');
    });

    it("returns created building", async () => {
        expect(response.body.building).toStrictEqual(postBuilding);
    });

    // Check wrong functionality

    it("returns 500 and error for empty building", async () => {
        const response = await request(app).post("/buildings").send({});
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('An error has occurred');
    });

    it("returns 500 and error for building with floors on string format", async () => {
        const response = await request(app).post("/buildings").send({
            name: "Test Building",
            floors: "Hello world",
            latitude: 39.48067057885303,
            longitude: -0.3398773008264785}
        );
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('An error has occurred');
    });

    it("returns 500 and error for building with latitude on string format", async () => {
        const response = await request(app).post("/buildings").send({
            name: "Test Building",
            floors: 3,
            latitude: "Hello World",
            longitude: -0.3398773008264785}
        );
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('An error has occurred');
    });

    it("returns 500 and error for building with longitude on string format", async () => {
        const response = await request(app).post("/buildings").send({
            name: "Test Building",
            floors: 3,
            latitude: 39.48067057885303,
            longitude: "Hello World"}
        );
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('An error has occurred');
    });

});

describe("PUT /buildings", () => {

    
    let firstBuilding;
    let response;

    const putBuilding = {
        name: "Test Building PUT",
        floors: 10,
        latitude: 39.48067057885303,
        longitude: -0.3398773008264785
    }

    beforeAll(async () => {
        const buildingList = await request(app).get("/buildings");
        firstBuilding = buildingList.body[0];
        response = await request(app).put(`/buildings/${firstBuilding.id}`).send(putBuilding);
    });

    // Check correct functionality

    it("returns 200", async () => {
        expect(response.statusCode).toBe(200);
    });

    it("returns JSON", async () => {
        expect(response.header["content-type"]).toEqual(expect.stringContaining("json"));
    });

    it("returns success message", async () => {
        expect(response.body.message).toBe('Building updated successfully');
    });

    it("returns updated building", async () => {
        expect(response.body.building).toStrictEqual(putBuilding);
    });

    // Check wrong functionality

    it("returns 500 and error for empty building", async () => {
        const response = await request(app).put(`/buildings/${firstBuilding.id}`).send({});
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('An error has occurred');
    });

    it("returns 500 and error for non existent building", async () => {
        const response = await request(app).put('/buildings/asdf').send(putBuilding);
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('An error has occurred');
    });

    it("returns 500 and error for building with floors on string format", async () => {
        const response = await request(app).put(`/buildings/${firstBuilding.id}`).send({
            name: "Test Building",
            floors: "Hello world",
            latitude: 39.48067057885303,
            longitude: -0.3398773008264785}
        );
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('An error has occurred');
    });

    it("returns 500 and error for building with latitude on string format", async () => {
        const response = await request(app).put(`/buildings/${firstBuilding.id}`).send({
            name: "Test Building",
            floors: 3,
            latitude: "Hello World",
            longitude: -0.3398773008264785}
        );
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('An error has occurred');
    });

    it("returns 500 and error for building with longitude on string format", async () => {
        const response = await request(app).put(`/buildings/${firstBuilding.id}`).send({
            name: "Test Building",
            floors: 3,
            latitude: 39.48067057885303,
            longitude: "Hello World"}
        );
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('An error has occurred');
    });

});

describe("DELETE /buildings", () => {

    let response;

    beforeAll(async () => {
        const buildingList = await request(app).get("/buildings");
        const firstBuilding = buildingList.body[0];
        response = await request(app).delete(`/buildings/${firstBuilding.id}`);
    });

    // Check correct functionality

    it("return 200", async () => {
        expect(response.statusCode).toBe(200);
    });

    it("returns success message", async () => {
        expect(response.text).toBe('Building deleted successfully');
    });

    // Check wrong functionality
    it("returns 500 and error for non existent building", async () => {
        const response = await request(app).delete('/buildings/asdf');
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('An error has occurred');
    });
})

afterAll(async () => {
    // Delete buildings from the database
    const buildingList = await request(app).get("/buildings");
    for (const building of buildingList.body) {
        await request(app).delete(`/buildings/${building.id}`);
    }
});