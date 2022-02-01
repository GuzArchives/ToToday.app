type SubTask = {
	description: string;
	checked: boolean;
};

type Task = {
	title: string;
	description: string;
	checked: boolean;
	newTask: boolean;
	autoCheck: boolean;
	subTasks: SubTask[];
};
