import { calculatePartHealth, calculateMachineHealth } from "../calculations";
import {
  AssemblyLinePart,
  MachineType,
  PaintingStationPart,
  QualityControlStationPart,
  WeldingRobotPart,
  partInfo,
} from "../../native-app/data/types";

describe("calculatePartHealth for WeldingRobot", () => {
  const machineName: MachineType = MachineType.WeldingRobot;

  const testCases = [
    { partName: WeldingRobotPart.ErrorRate, value: 0.5, expectedHealth: 72.22 },
    { partName: WeldingRobotPart.ErrorRate, value: 1.1, expectedHealth: 0 },
    { partName: WeldingRobotPart.ErrorRate, value: 0.05, expectedHealth: 100 },
    { partName: WeldingRobotPart.ErrorRate, value: NaN, expectedHealth: 0 },
    { partName: WeldingRobotPart.ErrorRate, value: 10, expectedHealth: 0 },
    {partName: WeldingRobotPart.VibrationLevel, value: 1.0, expectedHealth: 50,},
    { partName: WeldingRobotPart.VibrationLevel,value: 5.1, expectedHealth: 0,},
    { partName: WeldingRobotPart.VibrationLevel, value: 0.05, expectedHealth: 100,},
    { partName: WeldingRobotPart.VibrationLevel, value: -1, expectedHealth: 0 },
    { partName: WeldingRobotPart.VibrationLevel, value: NaN, expectedHealth: 0,},
    { partName: WeldingRobotPart.VibrationLevel, value: 20, expectedHealth: 0 },
    { partName: WeldingRobotPart.ElectrodeWear, value: 1.0, expectedHealth: 100,},
    { partName: WeldingRobotPart.ElectrodeWear, value: 1.1, expectedHealth: 0 },
    { partName: WeldingRobotPart.ElectrodeWear, value: 0.05, expectedHealth: 100,},
    { partName: WeldingRobotPart.ElectrodeWear, value: -1, expectedHealth: 0 },
    { partName: WeldingRobotPart.ElectrodeWear, value: NaN, expectedHealth: 0 },
    { partName: WeldingRobotPart.ElectrodeWear, value: 2.1, expectedHealth: 0 },
    { partName: WeldingRobotPart.ShieldingPressure, value: 10, expectedHealth: 50,},
    { partName: WeldingRobotPart.ShieldingPressure, value: 20, expectedHealth: 50,},
    {partName: WeldingRobotPart.ShieldingPressure, value: 5.2, expectedHealth: 100,},
    { partName: WeldingRobotPart.ShieldingPressure, value: -1, expectedHealth: 0,},
    { partName: WeldingRobotPart.ShieldingPressure,value: NaN,expectedHealth: 0,},
    { partName: WeldingRobotPart.ShieldingPressure,value: 0,expectedHealth: 0,},
    { partName: WeldingRobotPart.WireFeedRate, value: 10, expectedHealth: 100 },
    { partName: WeldingRobotPart.WireFeedRate, value: 15, expectedHealth: 50 },
    { partName: WeldingRobotPart.WireFeedRate, value: 2, expectedHealth: 100 },
    { partName: WeldingRobotPart.WireFeedRate, value: -1, expectedHealth: 0 },
    { partName: WeldingRobotPart.WireFeedRate, value: NaN, expectedHealth: 0 },
    { partName: WeldingRobotPart.WireFeedRate, value: 20, expectedHealth: 0 },
    { partName: WeldingRobotPart.ArcStability, value: 90, expectedHealth: 50 },
    { partName: WeldingRobotPart.ArcStability, value: 95.5, expectedHealth: 4.0816 },
    { partName: WeldingRobotPart.ArcStability, value: 90, expectedHealth: 50 },
    { partName: WeldingRobotPart.ArcStability, value: -1, expectedHealth: 0 },
    { partName: WeldingRobotPart.ArcStability, value: NaN, expectedHealth: 0 },
    { partName: WeldingRobotPart.ArcStability, value: 20, expectedHealth: 0 },
    { partName: WeldingRobotPart.SeamWidth, value: 1.0, expectedHealth: 50 },
    { partName: WeldingRobotPart.SeamWidth, value: 3.0, expectedHealth: 50 },
    { partName: WeldingRobotPart.SeamWidth, value: 0.5, expectedHealth: 100 },
    { partName: WeldingRobotPart.SeamWidth, value: -1, expectedHealth: 0 },
    { partName: WeldingRobotPart.SeamWidth, value: NaN, expectedHealth: 0 },
    { partName: WeldingRobotPart.SeamWidth, value: 5, expectedHealth: 0 },
    { partName: WeldingRobotPart.CoolingEfficiency, value: 80, expectedHealth: 50 },
    { partName: WeldingRobotPart.CoolingEfficiency, value: 90.1, expectedHealth: 0 },
    { partName: WeldingRobotPart.CoolingEfficiency, value: 70, expectedHealth: 100 },
    { partName: WeldingRobotPart.CoolingEfficiency, value: -1, expectedHealth: 0 },
    { partName: WeldingRobotPart.CoolingEfficiency, value: NaN, expectedHealth: 0 },
    { partName: WeldingRobotPart.CoolingEfficiency, value: 5, expectedHealth: 0 },
  ];

  testCases.forEach(({ partName, value, expectedHealth }) => {
    it(`calculates part health for ${partName} with value ${value}`, () => {
      const part: partInfo = { name: partName, value: value };
      const result = calculatePartHealth(machineName, part);
      expect(result).toBeCloseTo(expectedHealth);
    });
  });

  it("returns 0 for unrecognized machine name", () => {
    const machineName = "fakeMachine" as MachineType;
    const part: partInfo = { name: WeldingRobotPart.ErrorRate, value: 1.1 };
    const expectedHealth = 0;

    const result = calculatePartHealth(machineName, part);
    expect(result).toBe(expectedHealth);
  });

  it("returns 0 for unrecognized part name", () => {
    const part: partInfo = { name: "FakePart" as WeldingRobotPart, value: 1 };
    const expectedHealth = -1;

    const result = calculatePartHealth(machineName, part);
    expect(result).toBe(expectedHealth);
  });
});

describe("calculatePartHealth for Painting Station", () => {
  const machineName: MachineType = MachineType.PaintingStation;

  const testCases = [
    { partName: PaintingStationPart.FlowRate, value: 25, expectedHealth: 75 },
    { partName: PaintingStationPart.FlowRate, value: 30.1, expectedHealth: 0 },
    { partName: PaintingStationPart.FlowRate, value: 20, expectedHealth: 50 },
    { partName: PaintingStationPart.FlowRate, value: NaN, expectedHealth: 0 },
    { partName: PaintingStationPart.FlowRate, value: 0, expectedHealth: 0 },
    {partName: PaintingStationPart.Pressure, value: 50, expectedHealth: 50,},
    { partName: PaintingStationPart.Pressure,value: 60.1, expectedHealth: 0,},
    { partName: PaintingStationPart.Pressure, value: 40, expectedHealth: 100,},
    { partName: PaintingStationPart.Pressure, value: -1, expectedHealth: 0 },
    { partName: PaintingStationPart.Pressure, value: NaN, expectedHealth: 0,},
    { partName: PaintingStationPart.Pressure, value: 20, expectedHealth: 0 },
    { partName: PaintingStationPart.ColorConsistency, value: 90.0, expectedHealth: 50,},
    { partName: PaintingStationPart.ColorConsistency, value: 95.1, expectedHealth: 0 },
    { partName: PaintingStationPart.ColorConsistency, value: 85.0, expectedHealth: 100,},
    { partName: PaintingStationPart.ColorConsistency, value: -1, expectedHealth: 0 },
    { partName: PaintingStationPart.ColorConsistency, value: NaN, expectedHealth: 0 },
    { partName: PaintingStationPart.ColorConsistency, value: 2.1, expectedHealth: 0 },
    { partName: PaintingStationPart.NozzleCondition, value: 1, expectedHealth: 100,},
    { partName: PaintingStationPart.NozzleCondition, value: 2, expectedHealth: 0,},
    { partName: PaintingStationPart.NozzleCondition, value: 4, expectedHealth: 100,},
    { partName: PaintingStationPart.NozzleCondition, value: -1, expectedHealth: 0,},
    { partName: PaintingStationPart.NozzleCondition,value: NaN,expectedHealth: 0,},
    { partName: PaintingStationPart.NozzleCondition,value: 30,expectedHealth: 0,},
  ];

  testCases.forEach(({ partName, value, expectedHealth }) => {
    it(`calculates part health for ${partName} with value ${value}`, () => {
      const part: partInfo = { name: partName, value: value };
      const result = calculatePartHealth(machineName, part);
      expect(result).toBeCloseTo(expectedHealth);
    });
  });

  it("returns 0 for unrecognized part name", () => {
    const part: partInfo = { name: "FakePart" as PaintingStationPart, value: 1 };
    const expectedHealth = -1;

    const result = calculatePartHealth(machineName, part);
    expect(result).toBe(expectedHealth);
  });
});

describe("calculatePartHealth for Assembly Line", () => {
  const machineName: MachineType = MachineType.AssemblyLine;

  const testCases = [
    { partName: AssemblyLinePart.AlignmentAccuracy, value: 0.5, expectedHealth: 72.2222 },
    { partName: AssemblyLinePart.AlignmentAccuracy, value: 1.1, expectedHealth: 0 },
    { partName: AssemblyLinePart.AlignmentAccuracy, value: 0.1, expectedHealth: 50 },
    { partName: AssemblyLinePart.AlignmentAccuracy, value: NaN, expectedHealth: 0 },
    { partName: AssemblyLinePart.AlignmentAccuracy, value: 10, expectedHealth: 0 },
    {partName: AssemblyLinePart.Speed, value: 5.5, expectedHealth: 55,},
    { partName: AssemblyLinePart.Speed,value: 10.1, expectedHealth: 0,},
    { partName: AssemblyLinePart.Speed, value: 0, expectedHealth: 100,},
    { partName: AssemblyLinePart.Speed, value: -1, expectedHealth: 0 },
    { partName: AssemblyLinePart.Speed, value: NaN, expectedHealth: 0,},
    { partName: AssemblyLinePart.Speed, value: 20, expectedHealth: 0 },
    { partName: AssemblyLinePart.FittingTolerance, value: 0.02, expectedHealth: 62.5,},
    { partName: AssemblyLinePart.FittingTolerance, value: 0.1, expectedHealth: 50 },
    { partName: AssemblyLinePart.FittingTolerance, value: 0, expectedHealth: 100,},
    { partName: AssemblyLinePart.FittingTolerance, value: -1, expectedHealth: 0 },
    { partName: AssemblyLinePart.FittingTolerance, value: NaN, expectedHealth: 0 },
    { partName: AssemblyLinePart.FittingTolerance, value: 2.1, expectedHealth: 0 },
    { partName: AssemblyLinePart.BeltSpeed, value: 1, expectedHealth: 50,},
    { partName: AssemblyLinePart.BeltSpeed, value: 2, expectedHealth: 100,},
    { partName: AssemblyLinePart.BeltSpeed, value: 4, expectedHealth: 0,},
    { partName: AssemblyLinePart.BeltSpeed, value: -1, expectedHealth: 0,},
    { partName: AssemblyLinePart.BeltSpeed,value: NaN,expectedHealth: 0,},
    { partName: AssemblyLinePart.BeltSpeed,value: 30,expectedHealth: 0,},
  ];

  testCases.forEach(({ partName, value, expectedHealth }) => {
    it(`calculates part health for ${partName} with value ${value}`, () => {
      const part: partInfo = { name: partName, value: value };
      const result = calculatePartHealth(machineName, part);
      expect(result).toBeCloseTo(expectedHealth);
    });
  });

  it("returns 0 for unrecognized part name", () => {
    const part: partInfo = { name: "FakePart" as AssemblyLinePart, value: 1 };
    const expectedHealth = -1;

    const result = calculatePartHealth(machineName, part);
    expect(result).toBe(expectedHealth);
  });
});

describe("calculatePartHealth for Quality Control Station", () => {
  const machineName: MachineType = MachineType.QualityControlStation;

  const testCases = [
    { partName: QualityControlStationPart.CameraCalibration, value: 0, expectedHealth: 50 },
    { partName: QualityControlStationPart.CameraCalibration, value: 2.5, expectedHealth: 25 },
    { partName: QualityControlStationPart.CameraCalibration, value: 4, expectedHealth: 100 },
    { partName: QualityControlStationPart.CameraCalibration, value: NaN, expectedHealth: 0 },
    { partName: QualityControlStationPart.CameraCalibration, value: 6, expectedHealth: 0 },
    {partName: QualityControlStationPart.LightIntensity, value: 90, expectedHealth: 50,},
    { partName: QualityControlStationPart.LightIntensity,value: 95.2, expectedHealth: 1.020,},
    { partName: QualityControlStationPart.LightIntensity, value: 85, expectedHealth: 100,},
    { partName: QualityControlStationPart.LightIntensity, value: -1, expectedHealth: 0 },
    { partName: QualityControlStationPart.LightIntensity, value: NaN, expectedHealth: 0,},
    { partName: QualityControlStationPart.LightIntensity, value: 200, expectedHealth: 0 },
    { partName: QualityControlStationPart.SoftwareVersion, value: 1.0, expectedHealth: 0,},
    { partName: QualityControlStationPart.SoftwareVersion, value: 2.1, expectedHealth: 0 },
    { partName: QualityControlStationPart.SoftwareVersion, value: 2.0, expectedHealth: 0,},
    { partName: QualityControlStationPart.SoftwareVersion, value: -1, expectedHealth: 0 },
    { partName: QualityControlStationPart.SoftwareVersion, value: NaN, expectedHealth: 0 },
    { partName: QualityControlStationPart.SoftwareVersion, value: 2.1, expectedHealth: 0 },
    { partName: QualityControlStationPart.CriteriaSettings, value: 1, expectedHealth: 100,},
    { partName: QualityControlStationPart.CriteriaSettings, value: 2, expectedHealth: 0,},
    { partName: QualityControlStationPart.CriteriaSettings, value: 0, expectedHealth: 50,},
    { partName: QualityControlStationPart.CriteriaSettings, value: -1, expectedHealth: 0,},
    { partName: QualityControlStationPart.CriteriaSettings,value: NaN,expectedHealth: 0,},
    { partName: QualityControlStationPart.CriteriaSettings,value: 30,expectedHealth: 0,},
  ];

  testCases.forEach(({ partName, value, expectedHealth }) => {
    it(`calculates part health for ${partName} with value ${value}`, () => {
      const part: partInfo = { name: partName, value: value };
      const result = calculatePartHealth(machineName, part);
      expect(result).toBeCloseTo(expectedHealth);
    });
  });

  it("returns 0 for unrecognized part name", () => {
    const part: partInfo = { name: "FakePart" as PaintingStationPart, value: 1 };
    const expectedHealth = -1;

    const result = calculatePartHealth(machineName, part);
    expect(result).toBe(expectedHealth);
  });
});

describe("calculateMachineHealth WeldingRobot", () => {
  it("calculates machine health correctly", () => {
    const machineName: MachineType = MachineType.WeldingRobot;
    const parts = [
      { name: WeldingRobotPart.ErrorRate, value: 0.5 },
      { name: WeldingRobotPart.VibrationLevel, value: 4.0 },
      { name: WeldingRobotPart.ElectrodeWear, value: 0.8 },
      { name: WeldingRobotPart.ShieldingPressure, value: 12.0 },
      { name: WeldingRobotPart.WireFeedRate, value: 7.5 },
      { name: WeldingRobotPart.ArcStability, value: 92.0 },
      { name: WeldingRobotPart.SeamWidth, value: 1.5 },
      { name: WeldingRobotPart.CoolingEfficiency, value: 85.0 },
    ];
    const expectedHealth = 76.70138888888889;

    const result = calculateMachineHealth(machineName, parts);
    expect(result).toBe(expectedHealth);
  });

  it("calculates machine health optimal", () => {
    const machineName: MachineType = MachineType.WeldingRobot;
    const parts = [
      { name: WeldingRobotPart.ErrorRate, value: 0.05 },
      { name: WeldingRobotPart.VibrationLevel, value: 0.05 },
      { name: WeldingRobotPart.ElectrodeWear, value: 0.02 },
      { name: WeldingRobotPart.ShieldingPressure, value: 6 },
      { name: WeldingRobotPart.WireFeedRate, value: 2 },
      { name: WeldingRobotPart.ArcStability, value: 86 },
      { name: WeldingRobotPart.SeamWidth, value: 0.7 },
      { name: WeldingRobotPart.CoolingEfficiency, value: 72 },
    ];
    const expectedHealth = 100;

    const result = calculateMachineHealth(machineName, parts);
    expect(result).toBe(expectedHealth);
  });

  it("calculates machine health abnormal", () => {
    const machineName: MachineType = MachineType.WeldingRobot;
    const parts = [
      { name: WeldingRobotPart.ErrorRate, value: 1.2 },
      { name: WeldingRobotPart.VibrationLevel, value: 6 },
      { name: WeldingRobotPart.ElectrodeWear, value: 1.5 },
      { name: WeldingRobotPart.ShieldingPressure, value: 16 },
      { name: WeldingRobotPart.WireFeedRate, value: 12 },
      { name: WeldingRobotPart.ArcStability, value: 97 },
      { name: WeldingRobotPart.SeamWidth, value: 2.5 },
      { name: WeldingRobotPart.CoolingEfficiency, value: 91.0 },
    ];
    const expectedHealth = 13.961038961038968;

    const result = calculateMachineHealth(machineName, parts);
    expect(result).toBe(expectedHealth);
  });

});

describe("calculateMachineHealth Painting Station", () => {
  it("calculates machine health correctly", () => {
    const machineName: MachineType = MachineType.PaintingStation;
    const parts = [
      { name: PaintingStationPart.FlowRate, value: 22 },
      { name: PaintingStationPart.Pressure, value: 55 },
      { name: PaintingStationPart.ColorConsistency, value: 92 },
      { name: PaintingStationPart.NozzleCondition, value: 1 },
    ];
    const expectedHealth = 76.25;

    const result = calculateMachineHealth(machineName, parts);
    expect(result).toBe(expectedHealth);
  });

  it("calculates machine health optimal", () => {
    const machineName: MachineType = MachineType.PaintingStation;
    const parts = [
      { name: PaintingStationPart.FlowRate, value: 12 },
      { name: PaintingStationPart.Pressure, value: 45 },
      { name: PaintingStationPart.ColorConsistency, value: 85 },
      { name: PaintingStationPart.NozzleCondition, value: 5 },
    ];
    const expectedHealth = 100;

    const result = calculateMachineHealth(machineName, parts);
    expect(result).toBe(expectedHealth);
  });

  it("calculates machine health abnormal", () => {
    const machineName: MachineType = MachineType.PaintingStation;
    const parts = [
      { name: PaintingStationPart.FlowRate, value: 35 },
      { name: PaintingStationPart.Pressure, value: 65 },
      { name: PaintingStationPart.ColorConsistency, value: 100 },
      { name: PaintingStationPart.NozzleCondition, value: 2 },
    ];
    const expectedHealth = 24.87373737373737;

    const result = calculateMachineHealth(machineName, parts);
    expect(result).toBe(expectedHealth);
  });

});

describe("calculateMachineHealth Assembly Line", () => {
  it("calculates machine health correctly", () => {
    const machineName: MachineType = MachineType.AssemblyLine;
    const parts = [
      { name: AssemblyLinePart.AlignmentAccuracy, value: 0.5 },
      { name: AssemblyLinePart.Speed, value: 5.5 },
      { name: AssemblyLinePart.FittingTolerance, value: 0.02 },
      { name: AssemblyLinePart.BeltSpeed, value: 1.5 },
    ];
    const expectedHealth = 66.18055555555556;

    const result = calculateMachineHealth(machineName, parts);
    expect(result).toBe(expectedHealth);
  });

  it("calculates machine health optimal", () => {
    const machineName: MachineType = MachineType.AssemblyLine;
    const parts = [
      { name: AssemblyLinePart.AlignmentAccuracy, value: 0.01 },
      { name: AssemblyLinePart.Speed, value: 4 },
      { name: AssemblyLinePart.FittingTolerance, value: 0 },
      { name: AssemblyLinePart.BeltSpeed, value: 0.6 },
    ];
    const expectedHealth = 100;

    const result = calculateMachineHealth(machineName, parts);
    expect(result).toBe(expectedHealth);
  });

  it("calculates machine health abnormal", () => {
    const machineName: MachineType = MachineType.AssemblyLine;
    const parts = [
      { name: AssemblyLinePart.AlignmentAccuracy, value: 1.5 },
      { name: AssemblyLinePart.Speed, value: 12 },
      { name: AssemblyLinePart.FittingTolerance, value: 0.08 },
      { name: AssemblyLinePart.BeltSpeed, value: 2.5 },
    ];
    const expectedHealth = 22.208049886621314;

    const result = calculateMachineHealth(machineName, parts);
    expect(result).toBe(expectedHealth);
  });

});

describe("calculateMachineHealth Quality Control Station", () => {
  it("calculates machine health correctly", () => {
    const machineName: MachineType = MachineType.QualityControlStation;
    const parts: partInfo[] = [
      { name: QualityControlStationPart.CameraCalibration, value: 0.5 },
      { name: QualityControlStationPart.LightIntensity, value: 91 },
      { name: QualityControlStationPart.SoftwareVersion, value: 1.0 },
      { name: QualityControlStationPart.CriteriaSettings, value: 0.5 },
    ];
    const expectedHealth = 52.5;

    const result = calculateMachineHealth(machineName, parts);
    expect(result).toBe(expectedHealth);
  });

  it("calculates machine health optimal", () => {
    const machineName: MachineType = MachineType.QualityControlStation;
    const parts = [
      { name: QualityControlStationPart.CameraCalibration, value: 4 },
      { name: QualityControlStationPart.LightIntensity, value: 85 },
      { name: QualityControlStationPart.SoftwareVersion, value: 2.0 },
      { name: QualityControlStationPart.CriteriaSettings, value: 0 },
    ];
    const expectedHealth = 62.5;

    const result = calculateMachineHealth(machineName, parts);
    expect(result).toBe(expectedHealth);
  });

  it("calculates machine health abnormal", () => {
    const machineName: MachineType = MachineType.QualityControlStation;
    const parts = [
      { name: QualityControlStationPart.CameraCalibration, value: 2.5 },
      { name: QualityControlStationPart.LightIntensity, value: 96 },
      { name: QualityControlStationPart.SoftwareVersion, value: 2.1 },
      { name: QualityControlStationPart.CriteriaSettings, value: 2.5 },
    ];
    const expectedHealth = 14.79591836734695;

    const result = calculateMachineHealth(machineName, parts);
    expect(result).toBe(expectedHealth);
  });

});


