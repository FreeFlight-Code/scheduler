CREATE TABLE IF NOT EXISTS BUSINESSES (
  BID SERIAL NOT NULL PRIMARY KEY, 
  logo varchar(255),
  link varchar(255),
  businessname VARCHAR(50)
);
CREATE TABLE IF NOT EXISTS USERS (

  UID SERIAL NOT NULL PRIMARY KEY, 
  firstname VARCHAR(50),
  lastname VARCHAR(50),
  email VARCHAR(50),
  phone VARCHAR(12),
  birthday VARCHAR(10),
  password varchar(50) NOT NULL,
  comments VARCHAR(255),
  auth VARCHAR(50),
  BID int,
  FOREIGN KEY (BID) REFERENCES BUSINESSES(BID)
);
CREATE TABLE IF NOT EXISTS JOBS (

  JID SERIAL NOT NULL PRIMARY KEY, 
  businessname VARCHAR(50),
  jobname VARCHAR(50),
  firstname VARCHAR(50),
  lastname VARCHAR(50),
  comments VARCHAR(50),
  city VARCHAR(50),
  state VARCHAR(50),
  today DATE,
  jobdate DATE,
  bid int,
  uid int,
  FOREIGN KEY (BID) REFERENCES BUSINESSES(BID),
  FOREIGN KEY (UID) REFERENCES users(UID)
);