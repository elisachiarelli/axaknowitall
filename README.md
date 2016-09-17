# knowingTheRisks
A Game to show you know Risks and how to avoid them



# Setup DB Example Data
INSERT INTO RISK (ID, DESCRIPTION)
VALUES ('1', 'How could you prevent a fire when doing a barbecue with gas?'),
('2', 'How should you behave when filling the bathtub?'),
('3', 'How could you prevent a burglar to invade your home?');

INSERT INTO QUESTION (ID, CORRECT, QUESTION, RISK_ID)
VALUES ('1','0','Keep an extra tank nearby in case you run out of gas.','1'),
('2','1','Make sure you have a powder fire extinguisher.','1'),
('3','1','Do not smoke nearby and keep open flames away.','1'),
('4','1','I stay in the bath and keep an eye on the water level.','2'),
('5','0','I open the shower to fill the bath and go out to do my courses in the meantime.','2'),
('6','1','I use my detector that stops the water automatically when the bathtub is filled.','2'),
('7','1','Make sure all your windows are closed when you go out.','3'),
('8','1','Close your burglarproof windows completely when you leave home.','3'),
('9','0','Leave the windows open when you are out, so it looks like you are at home.','3');
