
# Task Manager

A simple application to perform CRUD operations on tasks.

## Run Locally

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

Run the tests

```bash
  npm test
```

## Assumptions and Limitations

* The end date is not accounting for time, and if the current date is selected, the task will not be shown as overdue.

* The sort function is sorting in ascending order, I did not do the descending order but it could be implemented easily. 

* For testing purposes, users list was created. 

* The state management is done in functional components, and but could be better in redux or mobx when implemented with back-end and user-management.

* I lost my internet for a day, so I could not do the git history.

## Code structure

I tried to keep the design as simple and neat as possible and kept simple css without using any UI library. I am familiar with bootstrap and ant design. I tried to avoid code duplication and used the same form for creating and editing a task. I do think that If i did the edit functionality in the table row, it would be better.


