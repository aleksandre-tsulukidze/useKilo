import React, { useEffect, useState } from 'react';
import './App.css';
import { useGetDataQuery } from './reactQuery';
import SearchForm from './components/SearchForm';
import Table from './components/Table';
import Loader from './components/loader';
import { useGetAwardsQuery } from './reactQuery/awards';
import { useLocation } from 'react-router';

function App() {
  const { search } = useLocation(); // Access the search part of the URL
  const [queryParams, setQueryParams] = useState(new URLSearchParams(search));

  // Whenever the URL changes, update the queryParams state

  const { data, isLoading } = useGetDataQuery();
  const { data: awardsData, isLoading: isAwardsLoading } = useGetAwardsQuery({
    params: queryParams,
  });

  useEffect(() => {
    setQueryParams(new URLSearchParams(search));
  }, [search]);

  return (
    <div className="App">
      <div className="title">Kilo Coding Challenge</div>
      <div className="dataWrapper">
        {isLoading ? <Loader /> : <SearchForm zones={data!} />}
      </div>
      <div className="dataWrapper">
        {isAwardsLoading ? (
          <Loader />
        ) : (
          <Table
            data={awardsData!.data}
            dataPagination={awardsData!.pagination}
          />
        )}
      </div>
    </div>
  );
}

export default App;
