/**
 * Created by caiminghui on 2017/7/17.
 */
export class Project{
    versionNum: string;
    id:string;
    name:string;
    customId:string;
    code:string;
    devName:string;
    devCodeName:string;
    virtualPath:string;
    port:string;
    dutyUserId:string;
    devLang:string;
    status:string;
    serverIp:string;
    serverUsername:string;
    databasePort:string;
    databasePwd:string;
    databaseName:string;
    dbUsername:string;
    deleteMark:string;
    sortCode:string;
    createDate:string;
    createUserId:string;
    createUserName:string;
    comments:string;
}

export class TodoTask{
    versionNum:string;
    id:string;
    name:string;
    content:string;
    dutyEmployeeId:string;
    addEmployeeId:string;
    forecastDay:string;
    startDate:string;
    forecastDate:string;
    finishDate:string;
    finishEmployeeId:string;
    level:string;
    isNotice:string;
    largeCategory:string;
    littleCategory:string;
    subCategory:string;
    projectId:string;
    taskType:string;
    taskStatus:string;
    attachmentInfo:string;
    dutyEmployeeName:string;
    addEmployeeName:string;
    focusEmployeeIds
    projectName:string;
    deleteMark:string;
    createDate:string;
    createUserId:string;
    createUserName:string;
    modifyDate:string;
    modifyUserId:string;
    modifyUserName:string;
    comments:string;
}

export class Employee{
    versionNum:string;
    employeeId:string;
    employeeName:string;
    deleteMark:string;
    isLocked:string;
    isLogin:string;
    isAppLogin:string;
}

export class WorkInfoModel{
    projects:Array<Project>;
    todoTasks:Array<TodoTask>;
    employees:Array<Employee>;
}
