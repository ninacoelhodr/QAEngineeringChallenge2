import axios from 'axios';

describe('Machine Health Calculation API', () => {
  it('should calculate machine health correctly with valid data', async () => {
    const validData = {
      machines: {
        weldingRobot: {
          errorRate: "0.5",
          vibrationLevel: "2.5",
          electrodeWear: "0.1"
        }
      }
    };

    const response = await axios.post('http://localhost:3001/machine-health', validData);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('factory');
    expect(response.data).toHaveProperty('machineScores');
    expect(response.data.machineScores).toHaveProperty("weldingRobot")
    expect(response.data.factory).toEqual("63.66")
    expect(response.data.machineScores.weldingRobot).toEqual("63.66")
  });

  it('should return an error for invalid data', async () => {
    const invalidData = {
      machines: {
        weldingRobot: {
          errorRate: "invalid data",
          vibrationLevel: "invalid data"
        }
      }
    };

    try {
      await axios.post('http://localhost:3001/machine-health', invalidData);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('error');
    }
  });

  it('should return an error for non-existent machine', async () => {
    const requestData = {
      machines: {
        nonExistentMachine: {
          somePart: "1.0"
        }
      }
    };

    try {
      await axios.post('http://localhost:3001/machine-health', requestData);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('error');
    }
  });

  it('should return 404 for non-existent endpoint', async () => {
    try {
      await axios.get('http://localhost:3001/non-existent-endpoint');
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });
});