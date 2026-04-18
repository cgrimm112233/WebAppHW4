export function Task({ name, isComplete, onToggle, onDelete }){
    return(
        <div className="task">
            <button
                className={isComplete ? "taskChecked":"taskCheck"}
                onClick={onToggle}
            />
            <p className={isComplete ? "taskPChecked":"taskP"}>{name}</p>
            <button
                className="taskDelete"
                onClick={onDelete}
            />
        </div>
    );
}