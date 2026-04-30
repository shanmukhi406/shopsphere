import React from 'react';

function SearchComponent({ searchCourse, courseSearchUserFunction }) {
	return (
		<header className="App-header">
			<h1>Discover Awesome Products</h1>
			<div className="search-bar">
				<input
					type="text"
					placeholder="Search for clothes, bags, shoes..."
					value={searchCourse}
					onChange={courseSearchUserFunction}
				/>
			</div>
		</header>
	);
}

export default SearchComponent;
