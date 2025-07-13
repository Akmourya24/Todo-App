const FilterComponent = ({ setCategory, category }) => {
    return (
        <div className="p-4 mt-3 rounded-lg shadow-md bg-white flex justify-between items-center">
            <select
                className="p-2 text-lg border border-gray-300 rounded-lg shadow focus:ring-2 focus:ring-purple-400"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="Future Goal">Future Goal</option>
                <option value="Education">Education</option>
                <option value="Finance">Finance</option>
                <option value="Relationship">Relationship</option>
                <option value="Social Life">Work</option>
                <option value="Social Life">Health</option>
                <option value="Social Life">Travel</option>
                <option value="Social Life">Other</option>
            </select>
        </div>
    );
};
export default FilterComponent;