# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket-1
Create a one-to-one map table of all the Agent IDs and the Custom Agent IDs curated by the Facilities in the database

#### Acceptance Criteria
- A newly created table `AgentIDMapper` in the database should contain IDs of all the Agents. 
- Each ID of the Agent should be tagged to a unique `Custom Agent ID` (The `Custom Agent ID` key should be the primary key) 

#### Implementation details
- Fetch the one-to-one map data of all the Agent IDs and the Custom Agent IDs curated by the Facilities.
- Create a table `AgentIDMapper` which maps `Agent ID` and the corrsponding `Custom Agent ID` for the agent.
    - The `Agent ID` would be the Foreign Key (FK) (tagged to the Agent Table where the Agent ID is the primary key [assumption])
    - `Custom Agent ID` would be the Primary Key (PK).
    - Schema - 

| Agent ID (FK) | Custom Agent ID (PK) |
|---------------|----------------------|
|               |                      |



#### Effort Estimate
- 1 man day

### Ticket-2
Create a function `getFacilityIdForAgent` that takes in `Agent ID` and returns its corresponding `Custom Agent ID` using the table AgentIDMapper in the database

#### Acceptance Criteria
- `getFacilityIdForAgent` should return correct Custom Agent ID as per the data stored in the AgentIDMapper table in the database.

#### Implementation details
- Write a function in node.js or python which - 
    - Takes in AgentID as a parameter.
    - Reads the `AgentIDMapper` table in the database
    - Returns the corresponding `Custom Agent ID`

#### Effort Estimate
- 0.5 man day

### Ticket-3
Update `getShiftsByFacility` function to replace the `Agent ID` value present inside the metadata about the Agent assigned to each shift data.

Acceptance Criteria
- `Agent ID` value present inside the metadata for each the Agent should be replaced with the corresponding `Custom Agent ID` as defined by the Facilities.

Implementation details
- For each Agent metadata entry returned by the  `getShiftsByFacility` function, 
    - Call the `getFacilityIdForAgent` function with the `Agent ID` (as present in the metadata entry)
    - Updata the metadata entry by replacing the `Agent ID` with the corresponding `Custom Agent ID` as returned by the `getFacilityIdForAgent` function.


Effort Estimate
- 0.5 man day




