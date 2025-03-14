import React, { FC, useEffect, useState } from 'react';
import classes from './index.module.css';
import { Zones } from '../../reactQuery/interfaces/index';
import { useLocation, useNavigate } from 'react-router';

interface SearchFormProps {
  zones: Zones[];
}

const SearchForm: FC<SearchFormProps> = ({ zones }) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [queryParams, setQueryParams] = useState(new URLSearchParams(search));

  useEffect(() => {
    setQueryParams(new URLSearchParams(search));
  }, [search]);

  const onZoneClick = (id: number) => {
    const updatedQueryParams = new URLSearchParams(queryParams);

    updatedQueryParams.set('zone', id.toString());
    navigate({
      pathname: window.location.pathname,
      search: updatedQueryParams.toString(),
    });
  };

  return (
    <div>
      <div className={classes.title}>Zones: </div>
      <div className={classes.zonesContainer}>
        {zones.map((zone, index) => {
          const zoneTidy = Object.values(zone)[0];
          return (
            <div
              onClick={() => onZoneClick(zoneTidy.zone_id)}
              key={zoneTidy.zone_id}
              className={`${classes.zone} ${
                queryParams.get('zone') === zoneTidy.zone_id.toString()
                  ? classes.active
                  : ''
              }`}
            >
              {zoneTidy.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchForm;
