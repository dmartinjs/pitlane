
// Constructor

export interface ConstructorTable {
  season:        string;
  constructorId: string;
  Constructors:  Constructor[];
}

export interface Constructor {
  constructorId: string;
  url:           string;
  name:          string;
  nationality:   string;
}

export interface ConstructorStanding {
  position:     string;
  positionText: string;
  points:       string;
  wins:         string;
  Constructor:  Constructor;
}

// Driver

export interface Driver {
  driverId:        string;
  permanentNumber: string;
  code:            string;
  url:             string;
  givenName:       string;
  familyName:      string;
  dateOfBirth:     Date;
  nationality:     string;
}

export interface DriverStanding {
  position:     string;
  positionText: string;
  points:       string;
  wins:         string;
  Driver:       Driver;
  Constructors: Constructor[];
}

// Race

export interface Race {
  season:   string;
  round:    string;
  url:      string;
  raceName: string;
  Circuit:  Circuit;
  date:     Date;
  time:     string;
}

// Circuit

export interface CircuitTable {
  season:    string;
  circuitId: string;
  Circuits:  Circuit[];
}

export interface Circuit {
  circuitId:   string;
  url:         string;
  circuitName: string;
  Location:    Location;
}

export interface Location {
  lat:      string;
  long:     string;
  locality: string;
  country:  string;
}

// Standing

export interface StandingsLists {
  season:          string;
  round:           string;
  DriverStandings: DriverStanding[];
}
