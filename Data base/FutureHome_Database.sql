CREATE DATABASE FutureHomeDB;
GO

USE FutureHomeDB;
GO


--------------------------------------------------
-- ROLES TABLE
--------------------------------------------------

CREATE TABLE roles (
    role_id INT PRIMARY KEY IDENTITY(1,1),
    role_name VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO roles(role_name)
VALUES ('Admin'),('Contractor'),('Engineer'),('Architect'),('Client');


--------------------------------------------------
-- USERS TABLE
--------------------------------------------------

CREATE TABLE users (
    user_id INT PRIMARY KEY IDENTITY(1,1),
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),

    CONSTRAINT fk_user_role
        FOREIGN KEY (role_id)
        REFERENCES roles(role_id)
        ON DELETE NO ACTION
        ON UPDATE CASCADE
);


--------------------------------------------------
-- PROPERTIES TABLE
--------------------------------------------------

CREATE TABLE properties (
    property_id INT PRIMARY KEY IDENTITY(1,1),
    title VARCHAR(150) NOT NULL,
    location VARCHAR(150) NOT NULL,
    price_range VARCHAR(50),
    size_sqft INT,
    bedrooms INT,
    bathrooms INT,
    status VARCHAR(20) DEFAULT 'available'
        CHECK (status IN ('available','in_project')),
    created_at DATETIME DEFAULT GETDATE()
);


--------------------------------------------------
-- PROJECTS TABLE
--------------------------------------------------

CREATE TABLE projects (
    project_id INT PRIMARY KEY IDENTITY(1,1),
    project_name VARCHAR(150) NOT NULL,
    property_id INT NOT NULL,
    contractor_id INT NOT NULL,
    start_date DATE,
    target_end_date DATE,
    status VARCHAR(20) DEFAULT 'planned'
        CHECK (status IN ('planned','in_progress','completed')),
    created_at DATETIME DEFAULT GETDATE(),

    CONSTRAINT fk_project_property
        FOREIGN KEY (property_id)
        REFERENCES properties(property_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_project_contractor
        FOREIGN KEY (contractor_id)
        REFERENCES users(user_id)
        ON DELETE NO ACTION
);


--------------------------------------------------
-- TASKS TABLE
--------------------------------------------------

CREATE TABLE tasks (
    task_id INT PRIMARY KEY IDENTITY(1,1),
    project_id INT NOT NULL,
    assigned_user INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    priority VARCHAR(20) DEFAULT 'medium'
        CHECK (priority IN ('high','medium','low')),
    status VARCHAR(20) DEFAULT 'planned'
        CHECK (status IN ('planned','in_progress','completed')),
    start_date DATE,
    due_date DATE,

    CONSTRAINT fk_task_project
        FOREIGN KEY (project_id)
        REFERENCES projects(project_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_task_user
        FOREIGN KEY (assigned_user)
        REFERENCES users(user_id)
        ON DELETE NO ACTION
);


--------------------------------------------------
-- MATERIALS TABLE
--------------------------------------------------

CREATE TABLE materials (
    material_id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100),
    unit_cost DECIMAL(10,2) NOT NULL,
    unit_type VARCHAR(50) NOT NULL,
    texture_file VARCHAR(255)      -- used by AR system
);


--------------------------------------------------
-- PROJECT MATERIALS (MANY TO MANY)
--------------------------------------------------

CREATE TABLE project_materials (
    id INT PRIMARY KEY IDENTITY(1,1),
    project_id INT NOT NULL,
    material_id INT NOT NULL,
    quantity INT NOT NULL
        CHECK (quantity > 0),

    CONSTRAINT fk_pm_project
        FOREIGN KEY (project_id)
        REFERENCES projects(project_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_pm_material
        FOREIGN KEY (material_id)
        REFERENCES materials(material_id)
        ON DELETE CASCADE
);


--------------------------------------------------
-- SUSTAINABILITY TABLE
--------------------------------------------------

CREATE TABLE sustainability (
    sustainability_id INT PRIMARY KEY IDENTITY(1,1),
    material_id INT NOT NULL UNIQUE,
    eco_score INT CHECK (eco_score BETWEEN 0 AND 100),
    carbon_kg_per_unit DECIMAL(10,2),
    notes TEXT,

    CONSTRAINT fk_sustainability_material
        FOREIGN KEY (material_id)
        REFERENCES materials(material_id)
        ON DELETE CASCADE
);


--------------------------------------------------
-- CLIENT INQUIRIES
--------------------------------------------------

CREATE TABLE inquiries (
    inquiry_id INT PRIMARY KEY IDENTITY(1,1),
    property_id INT NOT NULL,
    client_id INT NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new'
        CHECK (status IN ('new','in_progress','resolved')),
    created_at DATETIME DEFAULT GETDATE(),

    CONSTRAINT fk_inquiry_property
        FOREIGN KEY (property_id)
        REFERENCES properties(property_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_inquiry_client
        FOREIGN KEY (client_id)
        REFERENCES users(user_id)
        ON DELETE NO ACTION
);


--------------------------------------------------
-- AR MODELS TABLE
--------------------------------------------------

CREATE TABLE ar_models (
    model_id INT PRIMARY KEY IDENTITY(1,1),
    property_id INT NOT NULL,
    model_name VARCHAR(150),
    model_file VARCHAR(255),
    model_type VARCHAR(20),
    uploaded_by INT,
    upload_date DATETIME DEFAULT GETDATE(),

    CONSTRAINT fk_armodel_property
        FOREIGN KEY (property_id)
        REFERENCES properties(property_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_armodel_user
        FOREIGN KEY (uploaded_by)
        REFERENCES users(user_id)
        ON DELETE NO ACTION
);


--------------------------------------------------
-- PROPERTY MATERIAL OPTIONS (AR CUSTOMIZATION)
--------------------------------------------------

CREATE TABLE property_material_options (
    option_id INT PRIMARY KEY IDENTITY(1,1),
    property_id INT NOT NULL,
    material_id INT NOT NULL,

    CONSTRAINT fk_pmo_property
        FOREIGN KEY (property_id)
        REFERENCES properties(property_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_pmo_material
        FOREIGN KEY (material_id)
        REFERENCES materials(material_id)
        ON DELETE CASCADE
);


--------------------------------------------------
-- CLIENT MATERIAL SELECTION
--------------------------------------------------

CREATE TABLE property_material_selection (
    selection_id INT PRIMARY KEY IDENTITY(1,1),
    property_id INT NOT NULL,
    material_id INT NOT NULL,
    selected_by INT NOT NULL,
    selected_date DATETIME DEFAULT GETDATE(),

    CONSTRAINT fk_selection_property
        FOREIGN KEY (property_id)
        REFERENCES properties(property_id),

    CONSTRAINT fk_selection_material
        FOREIGN KEY (material_id)
        REFERENCES materials(material_id),

    CONSTRAINT fk_selection_user
        FOREIGN KEY (selected_by)
        REFERENCES users(user_id)
);


--------------------------------------------------
-- AR VIEW LOGS
--------------------------------------------------

CREATE TABLE ar_view_logs (
    log_id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT,
    model_id INT,
    view_time DATETIME DEFAULT GETDATE(),

    CONSTRAINT fk_arlog_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id),

    CONSTRAINT fk_arlog_model
        FOREIGN KEY (model_id)
        REFERENCES ar_models(model_id)
);


--------------------------------------------------
-- AI RISK PREDICTION TABLE
--------------------------------------------------

CREATE TABLE risk_predictions (
    prediction_id INT PRIMARY KEY IDENTITY(1,1),
    project_id INT NOT NULL,
    risk_type VARCHAR(100),
    risk_level VARCHAR(20)
        CHECK (risk_level IN ('Low','Medium','High')),
    predicted_delay_days INT,
    predicted_cost_increase DECIMAL(12,2),
    prediction_date DATETIME DEFAULT GETDATE(),

    CONSTRAINT fk_prediction_project
        FOREIGN KEY (project_id)
        REFERENCES projects(project_id)
        ON DELETE CASCADE
);


--------------------------------------------------
-- ESTIMATE TABLE
--------------------------------------------------

CREATE TABLE estimates (
    estimate_id INT PRIMARY KEY IDENTITY(1,1),
    project_id INT UNIQUE,
    total_cost DECIMAL(18,2),
    last_updated DATETIME DEFAULT GETDATE(),

    CONSTRAINT fk_estimate_project
        FOREIGN KEY (project_id)
        REFERENCES projects(project_id)
        ON DELETE CASCADE
);


--------------------------------------------------
-- FUNCTION – PROJECT MATERIAL ESTIMATE
--------------------------------------------------

IF OBJECT_ID('fn_ProjectMaterialEstimate', 'FN') IS NOT NULL
DROP FUNCTION fn_ProjectMaterialEstimate;
GO

CREATE FUNCTION fn_ProjectMaterialEstimate
(
    @project_id INT
)
RETURNS DECIMAL(18,2)
AS
BEGIN

    DECLARE @total DECIMAL(18,2);

    SELECT @total = SUM(pm.quantity * m.unit_cost)
    FROM project_materials pm
    INNER JOIN materials m
        ON pm.material_id = m.material_id
    WHERE pm.project_id = @project_id;

    RETURN ISNULL(@total,0);

END;
GO


--------------------------------------------------
-- VIEW – PROJECT ESTIMATE SUMMARY
--------------------------------------------------

IF OBJECT_ID('vw_ProjectEstimateSummary', 'V') IS NOT NULL
DROP VIEW vw_ProjectEstimateSummary;
GO

CREATE VIEW vw_ProjectEstimateSummary
AS
SELECT
    p.project_id,
    p.project_name,
    pr.title AS property_name,
    dbo.fn_ProjectMaterialEstimate(p.project_id) AS total_estimated_cost,
    p.status,
    p.start_date,
    p.target_end_date
FROM projects p
INNER JOIN properties pr
ON p.property_id = pr.property_id;
GO


--------------------------------------------------
-- VIEW – ESTIMATE DETAILS
--------------------------------------------------

IF OBJECT_ID('vw_ProjectEstimateDetails', 'V') IS NOT NULL
DROP VIEW vw_ProjectEstimateDetails;
GO

CREATE VIEW vw_ProjectEstimateDetails
AS
SELECT
    p.project_id,
    p.project_name,
    m.material_id,
    m.name AS material_name,
    pm.quantity,
    m.unit_cost,
    (pm.quantity * m.unit_cost) AS material_total_cost
FROM project_materials pm
INNER JOIN projects p
ON pm.project_id = p.project_id
INNER JOIN materials m
ON pm.material_id = m.material_id;
GO


--------------------------------------------------
-- TRIGGER – AUTO UPDATE ESTIMATES
--------------------------------------------------

IF OBJECT_ID('trg_UpdateProjectEstimate', 'TR') IS NOT NULL
DROP TRIGGER trg_UpdateProjectEstimate;
GO

CREATE TRIGGER trg_UpdateProjectEstimate
ON project_materials
AFTER INSERT, UPDATE, DELETE
AS
BEGIN

SET NOCOUNT ON;

DECLARE @project_id INT;

SELECT TOP 1 @project_id = project_id FROM inserted;

IF @project_id IS NULL
SELECT TOP 1 @project_id = project_id FROM deleted;

IF @project_id IS NULL
RETURN;

DECLARE @total DECIMAL(18,2);

SELECT @total = SUM(pm.quantity * m.unit_cost)
FROM project_materials pm
INNER JOIN materials m
ON pm.material_id = m.material_id
WHERE pm.project_id = @project_id;

SET @total = ISNULL(@total,0);

IF EXISTS (SELECT 1 FROM estimates WHERE project_id = @project_id)

UPDATE estimates
SET total_cost = @total,
last_updated = GETDATE()
WHERE project_id = @project_id;

ELSE

INSERT INTO estimates(project_id,total_cost)
VALUES(@project_id,@total);

END;
GO

SELECT * FROM projects;

INSERT INTO users (full_name,email,password,role_id)
VALUES
('System Admin','admin@futurehome.com','123456',1),
('John Contractor','contractor@futurehome.com','123456',2),
('Emma Engineer','engineer@futurehome.com','123456',3),
('David Architect','architect@futurehome.com','123456',4),
('Client Silva','client@futurehome.com','123456',5);

INSERT INTO properties (title,location,price_range,size_sqft,bedrooms,bathrooms,status)
VALUES
('Luxury Villa','Colombo','20M-25M',2500,4,3,'available'),
('City Apartment','Kandy','12M-15M',1100,2,2,'in_project'),
('Modern House','Galle','15M-18M',1800,3,2,'available'),
('Beach Villa','Matara','25M-30M',3000,5,4,'available');

INSERT INTO projects (project_name,property_id,contractor_id,start_date,target_end_date,status)
SELECT
'Villa Construction',
property_id,
2,
'2026-03-01',
'2026-09-01',
'in_progress'
FROM properties
WHERE title='Luxury Villa';

INSERT INTO projects (project_name,property_id,contractor_id,start_date,target_end_date,status)
SELECT
'House Construction',
property_id,
4,
'2026-01-01',
'2027-01-11',
'in_progress'
FROM properties
WHERE title='Modern House'

DELETE FROM ar_view_logs;
DELETE FROM property_material_selection;
DELETE FROM property_material_options;
DELETE FROM ar_models;
DELETE FROM inquiries;
DELETE FROM risk_predictions;
DELETE FROM sustainability;
DELETE FROM project_materials;
DELETE FROM tasks;
DELETE FROM estimates;
DELETE FROM projects;
DELETE FROM materials;
DELETE FROM properties;
DELETE FROM users;

DBCC CHECKIDENT ('users', RESEED, 0);
DBCC CHECKIDENT ('properties', RESEED, 0);
DBCC CHECKIDENT ('projects', RESEED, 0);
DBCC CHECKIDENT ('tasks', RESEED, 0);
DBCC CHECKIDENT ('materials', RESEED, 0);
DBCC CHECKIDENT ('project_materials', RESEED, 0);
DBCC CHECKIDENT ('sustainability', RESEED, 0);
DBCC CHECKIDENT ('inquiries', RESEED, 0);
DBCC CHECKIDENT ('ar_models', RESEED, 0);
DBCC CHECKIDENT ('property_material_options', RESEED, 0);
DBCC CHECKIDENT ('property_material_selection', RESEED, 0);
DBCC CHECKIDENT ('ar_view_logs', RESEED, 0);
DBCC CHECKIDENT ('risk_predictions', RESEED, 0);
DBCC CHECKIDENT ('estimates', RESEED, 0);

INSERT INTO users (full_name,email,password,role_id)
VALUES
('System Admin','admin@futurehome.com','123456',1),
('John Contractor','contractor@futurehome.com','123456',2),
('Emma Engineer','engineer@futurehome.com','123456',3),
('David Architect','architect@futurehome.com','123456',4),
('Client Silva','client@futurehome.com','123456',5);

INSERT INTO properties (title,location,price_range,size_sqft,bedrooms,bathrooms,status)
VALUES
('Luxury Villa','Colombo','20M-25M',2500,4,3,'available'),
('City Apartment','Kandy','12M-15M',1100,2,2,'in_project'),
('Modern House','Galle','15M-18M',1800,3,2,'available');

INSERT INTO projects (project_name,property_id,contractor_id,start_date,target_end_date,status)
VALUES
('Villa Construction',1,2,'2026-03-01','2026-09-01','in_progress'),
('Apartment Renovation',2,2,'2026-03-10','2026-06-10','planned'),
('Modern House Build',3,2,'2026-04-01','2026-12-01','planned');

INSERT INTO tasks (project_id,assigned_user,title,priority,status,start_date,due_date)
VALUES
(1,3,'Foundation Work','high','in_progress','2026-03-02','2026-03-20'),
(1,3,'Structural Planning','medium','planned','2026-03-05','2026-03-25'),
(2,3,'Interior Design','medium','planned','2026-03-12','2026-04-01');

INSERT INTO materials (name,category,unit_cost,unit_type,texture_file)
VALUES
('Concrete','Structural',12000,'cubic_meter','concrete.jpg'),
('Steel','Structural',15000,'kg','steel.jpg'),
('Wood','Interior',8000,'piece','wood.jpg');

SELECT * FROM inquiries;

INSERT INTO properties (title, location, price_range, size_sqft, bedrooms, bathrooms, status)
VALUES
('Eco Smart House', 'Kandy', '22M-28M', 2100, 3, 2, 'available'),
('Town House', 'Colombo', '18M-22M', 1800, 3, 2, 'available'),
('Studio Apartment', 'Colombo', '6M-8M', 600, 1, 1, 'available'),
('Budget Home', 'Anuradhapura', '7M-9M', 800, 2, 1, 'available'),
('Compact Apartment', 'Kandy', '5M-7M', 550, 1, 1, 'available');

INSERT INTO projects (project_name, property_id, contractor_id, start_date, target_end_date, status)
VALUES
('Beach Villa Construction', 6, 2, '2026-05-01', '2026-12-01', 'planned'),
('Townhouse Development', 7, 2, '2026-04-15', '2026-10-15', 'in_progress'),
('Eco House Build', 8, 2, '2026-06-01', '2027-01-01', 'planned'),
('Studio Apartment Renovation', 9, 2, '2026-03-20', '2026-05-20', 'in_progress'),
('Mountain Villa Construction', 10, 2, '2026-07-01', '2027-02-01', 'planned');

INSERT INTO tasks (project_id, assigned_user, title, priority, status, start_date, due_date)
VALUES
(1, 3, 'Site Clearing', 'high', 'planned', '2026-03-01', '2026-03-05'),
(1, 3, 'Foundation Work', 'high', 'in_progress', '2026-03-06', '2026-03-20'),
(1, 3, 'Brick Work', 'medium', 'planned', '2026-03-21', '2026-04-10'),
(2, 3, 'Electrical Wiring', 'high', 'planned', '2026-03-15', '2026-03-30'),
(2, 3, 'Plumbing', 'medium', 'planned', '2026-04-01', '2026-04-15'),
(3, 3, 'Roof Installation', 'medium', 'planned', '2026-05-01', '2026-05-20'),
(3, 3, 'Painting', 'low', 'planned', '2026-06-01', '2026-06-10'),
(1, 3, 'Interior Finishing', 'medium', 'planned', '2026-03-25', '2026-04-10'),
(2, 3, 'Solar Panel Setup', 'medium', 'planned', '2026-07-10', '2026-07-20'),
(3, 3, 'Flooring', 'medium', 'planned', '2026-04-20', '2026-05-01');

INSERT INTO materials (name, category, unit_cost, unit_type)
VALUES
('Cement', 'Structural', 12000, 'bag'),
('Steel', 'Structural', 15000, 'kg'),
('Sand', 'Structural', 8000, 'cubic_meter'),
('Bricks', 'Structural', 50, 'piece'),
('Tiles', 'Interior', 300, 'piece'),
('Paint', 'Interior', 5000, 'bucket'),
('Wood', 'Interior', 8000, 'piece'),
('Glass', 'Interior', 9000, 'sqm');

SELECT user_id, full_name, email, role_id FROM users;

