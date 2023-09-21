INSERT INTO department (name)
VALUES 
('Executive Board'),
('Marketing'),
('Human Resources'),
('Finance'),
('Engineering'),
('Information Technology'),
('Customer Relations'),
('Research and Development'),
('Legal'),
('Maintenance');

INSERT INTO role (title, salary, department_id)
VALUES 
('Chief Executive Officer', 555000.00, 1),
('Marketing Manager', 125000.00, 2),
('HR Director', 189000.00, 3),
('Finance Head', 145000.00, 4),
('Senior Engineer', 185000.00, 5),
('IT Manager', 125000.00, 6),
('Customer Relations Manager', 75000.00, 7),
('Research and Development Manager', 185000.00, 8),
('Legal Manager', 95000.00, 9),
('Maintenance Manager', 135000.00, 10);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
   
('Alice', 'Smith', 1, 1),
('Bob', 'Johnson', 2, 2),
('Carol', 'Williams', 3, 3),
('Dave', 'Brown', 4, 4),
('Eve', 'Miller', 5, 5),
('Frank', 'Davis', 6, 6),
('George', 'Garcia', 7, 7),
('Hannah', 'Rodriguez', 8, 8),
('Isaac', 'Wilson', 9, 9),
('Jack', 'Taylor', 10, 10);
