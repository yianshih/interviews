type Id = number;

type Task = {
  readonly id: Id;

  taskType: string;

  body: string;

  priority: number;

  subTasks: Id[];
};

class TaskService {
  private idCounter: number = 0;

  private allTasks: Map<Id, Task> = new Map();

  add(body: string) {
    const id = ++this.idCounter;

    const task = { id, body, priority: 0, subTasks: [], taskType: "main" };

    this.allTasks.set(id, task);

    return id;
  }

  addSubTask(body: string, parentId: Id) {
    const id = ++this.idCounter;

    const task = { id, body, priority: 0, subTasks: [], taskType: "subtask" };

    this.allTasks.set(id, task);

    const parent = this.allTasks.get(parentId);

    if (!parent) {
      throw new Error("Could not find parent task.");
    }

    parent.subTasks.push(task.id);

    return id;
  }
  increasePriority(id: Id) {
    this.allTasks.get(id)!.priority++;
  }

  edit(id: Id, newBody: string) {
    this.allTasks.get(id)!.body = newBody;
  }

  delete(id: Id) {
    // if subtask
    // remove from main task

    // if main task
    // remove subtasks from Map
    return this.allTasks.delete(id);
  }

  getAll() {
    // 10 per page
    // offset: 10 (start 11)
    return Array.from(this.allTasks.values()).filter((t) => t.taskType);
  }
}

// GET /tasks
// POST /tasks/<id> // create

// Get /task
// parameters filtering (taskType, offset, size, sortBy: priority, includes subtasks:boolean)

// POST
// /task body (taskType, body:task body, priority, parentId:optional) // create

// /task/<id> ( action: edit / delete, body: {} )

//
export {};
