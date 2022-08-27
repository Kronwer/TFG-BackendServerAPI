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

    it("returns 500 and error when floors is a string", async () => {
        const response = await request(app).post("/buildings").send({
            name: "Test Building",
            floors: "Hello world",
            latitude: 39.48067057885303,
            longitude: -0.3398773008264785}
        );
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('An error has occurred');
    });

    it("returns 500 and error when latitude is a string", async () => {
        const response = await request(app).post("/buildings").send({
            name: "Test Building",
            floors: 3,
            latitude: "Hello World",
            longitude: -0.3398773008264785}
        );
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('An error has occurred');
    });

    it("returns 500 and error when longitude is a string", async () => {
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
});

describe("GET /coordinates", () => {

    // HTTP Request
    let response;

    let firstBuilding;

    beforeAll(async () => {
        const buildingList = await request(app).get("/buildings");
        firstBuilding = buildingList.body[0];
        await request(app).post("/coordinates").send(
            {
                building: firstBuilding.id,
                floornumber: 2,
                latitude: 39.482926395770775,
                longitude: -0.3468272121410691,
                timestamp: "2022-07-12 12:00:00"
            }
        );
        response = await request(app).get("/coordinates").query(
            {
                building: firstBuilding.id,
                startDate: "2020-01-01 19:00:00",
                endDate: "2030-12-30 20:00:00"
            }
        );
    });

    // Check correct functionality

    it("returns 200 for existing building", async () => {
        expect(response.statusCode).toBe(200);
    });

    it("returns the array of coordinates for existing building", async () => {
        expect(response.body.length >= 1).toBe(true);
    });

    // Check wrong functionality

    it("returns 500 and error for empty query", async () => {
        const response = await request(app).get("/coordinates").query({});
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('An error has occurred');
    });

    it("returns 500 and error for missing building attribute", async () => {
        const response = await request(app).get("/coordinates").query({
            startDate: "2020-01-01 19:00:00",
            endDate: "2030-12-30 20:00:00"
        });
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('An error has occurred');
    });

    it("returns 500 and error for missing startDate attribute", async () => {
        const response = await request(app).get("/coordinates").query({
            building: firstBuilding.id,
            endDate: "2030-12-30 20:00:00"
        });
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('An error has occurred');
    });

    it("returns 500 and error for missing endDate attribute", async () => {
        const response = await request(app).get("/coordinates").query({
            building: firstBuilding.id,
            startDate: "2020-01-01 19:00:00"
        });
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('An error has occurred');
    });

});

describe("POST /coordinates", () => {

    // HTTP Request
    let response;

    let firstBuilding;
    let newCoordinate;

    beforeAll(async () => {
        const buildingList = await request(app).get("/buildings");
        firstBuilding = buildingList.body[0];
        newCoordinate = {
            building: firstBuilding.id,
            floornumber: 2,
            latitude: 39.482926395770775,
            longitude: -0.3468272121410691,
            timestamp: "2022-07-12 12:00:00"
        }
        response = await request(app).post("/coordinates").send(newCoordinate);
    });

    // Check correct functionality

    it("returns 200", async () => {
        expect(response.statusCode).toBe(200);
    });

    it("returns JSON", async () => {
        expect(response.header["content-type"]).toEqual(expect.stringContaining("json"));
    });

    it("returns success message", async () => {
        expect(response.body.message).toBe('Coordinate added succesfully');
    });

    it("returns created coordinate", async () => {
        expect(response.body.coordinate).toStrictEqual(newCoordinate);
    });

    // Check wrong functionality

    it("returns 400 and error for empty coordinate", async () => {
        const response = await request(app).post("/coordinates").send({});
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe(`Invalid values for latitude and longitude`);
    });

    it("returns 400 and error for latitude under -90", async () => {
        const response = await request(app).post("/coordinates").send({
            building: firstBuilding.id,
            floornumber: 2,
            latitude: -139.482926395770775,
            longitude: -0.3468272121410691,
            timestamp: "2022-07-12 12:00:00"
        });
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe(`Invalid values for latitude and longitude`);
    });

    it("returns 400 and error for latitude over 90", async () => {
        const response = await request(app).post("/coordinates").send({
            building: firstBuilding.id,
            floornumber: 2,
            latitude: 139.482926395770775,
            longitude: -0.3468272121410691,
            timestamp: "2022-07-12 12:00:00"
        });
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe(`Invalid values for latitude and longitude`);
    });

    it("returns 400 and error for longitude under -180", async () => {
        const response = await request(app).post("/coordinates").send({
            building: firstBuilding.id,
            floornumber: 2,
            latitude: 39.482926395770775,
            longitude: -300.3468272121410691,
            timestamp: "2022-07-12 12:00:00"
        });
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe(`Invalid values for latitude and longitude`);
    });

    it("returns 400 and error for longitude over 180", async () => {
        const response = await request(app).post("/coordinates").send({
            building: firstBuilding.id,
            floornumber: 2,
            latitude: 39.482926395770775,
            longitude: 300.3468272121410691,
            timestamp: "2022-07-12 12:00:00"
        });
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe(`Invalid values for latitude and longitude`);
    });

    it("returns 500 and error for wrong building id", async () => {
        const response = await request(app).post("/coordinates").send({
            building: "asdf",
            floornumber: 2,
            latitude: 39.482926395770775,
            longitude: -0.3468272121410691,
            timestamp: "2022-07-12 12:00:00"
        });
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe(`Couldn't create coordinate, please check the attributes are correct`);
    });

    it("returns 500 and error when floornumber is a string", async () => {
        const response = await request(app).post("/coordinates").send({
            building: firstBuilding.id,
            floornumber: "Hello world",
            latitude: 39.482926395770775,
            longitude: -0.3468272121410691,
            timestamp: "2022-07-12 12:00:00"
        });
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe(`Couldn't create coordinate, please check the attributes are correct`);
    });

    it("returns 500 and error when latitude is a string", async () => {
        const response = await request(app).post("/coordinates").send({
            building: firstBuilding.id,
            floornumber: 2,
            latitude: "Hello world",
            longitude: -0.3468272121410691,
            timestamp: "2022-07-12 12:00:00"
        });
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('Invalid values for latitude and longitude');
    });

    it("returns 500 and error when longitude is a string", async () => {
        const response = await request(app).post("/coordinates").send({
            building: firstBuilding.id,
            floornumber: 2,
            latitude: 39.482926395770775,
            longitude: "Hello World",
            timestamp: "2022-07-12 12:00:00"
        });
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('Invalid values for latitude and longitude');
    });

})

afterAll(async () => {
    // Delete buildings from the database
    const buildingList = await request(app).get("/buildings");
    for (const building of buildingList.body) {
        await request(app).delete(`/buildings/${building.id}`);
    };
});