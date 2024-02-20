import { renderHook, act } from '@testing-library/react-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMachineData } from '../../app/useMachineData'; 
export * from '@react-native-async-storage/async-storage/jest/async-storage-mock';


describe('useMachineData Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks(); 
  });

  it('loads machine data from AsyncStorage', async () => {
    const mockData = {
      weldingRobot: {
        errorRate: 0.5,
        vibrationLevel: 2.5,
      },
      paintingStation: {
        flowRate: 20.0,
        pressure: 50.0,
      }
    };
  
    jest.spyOn(AsyncStorage, 'getItem')
      .mockResolvedValue(JSON.stringify(mockData));
  
    const { result, waitFor } = renderHook(() => useMachineData());
  
    await waitFor(() => result.current.machineData !== undefined);
  
    expect(result.current.machineData).toEqual(mockData);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('machineData');
  });

  it('resets machine data correctly', async () => {
    const initialData = {
      weldingRobot: {
        errorRate: 0.5,
        vibrationLevel: 2.5,
      },
      paintingStation: {
        flowRate: 20.0,
        pressure: 50.0,
      }
    };

    jest.spyOn(AsyncStorage, 'getItem')
    .mockResolvedValue(JSON.stringify(initialData));

    const { result } = renderHook(() => useMachineData());
    await act(async () => {
      await result.current.updateMachineData(initialData);
    });

    await act(async () => {
      await result.current.resetMachineData();
    });

    expect(result.current.machineData).toBe(undefined);

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('machineData');
  });

  it('sets scores correctly and updates AsyncStorage', async () => {
    const initialData = {
      weldingRobot: {
        errorRate: 0.5,
        vibrationLevel: 2.5,
      },
      paintingStation: {
        flowRate: 20.0,
        pressure: 50.0,
      }
    };

    const newScores = {
      weldingRobot: 85,
      paintingStation: 90
    };
    jest.spyOn(AsyncStorage, 'getItem')
    .mockResolvedValue(JSON.stringify(initialData));

    const { result } = renderHook(() => useMachineData());

    await act(async () => {
      await result.current.updateMachineData(initialData);
    });

    await act(async () => {
      await result.current.setScores(newScores);
    });

    expect(result.current.machineData.scores).toEqual(newScores);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('machineData', JSON.stringify({...initialData, scores: newScores}));
  });


});
