import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';
import { Person } from '../types';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const getParentSlug = (choseName: string) => people
    .find(person => person.name === choseName)?.slug;

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const {
            name,
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug: currentSlug,
          } = person;

          const fatherSlug = getParentSlug(fatherName ?? '');

          const motherSlug = getParentSlug(motherName ?? '');

          return (
            <tr
              key={currentSlug}
              data-cy="person"
              className={classNames({
                'has-background-warning': currentSlug === slug,
              })}
            >
              <td>
                <Link
                  to={`../${currentSlug}`}
                  className={classNames({
                    'has-text-danger': sex === 'f',
                  })}
                >
                  {name}
                </Link>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              {motherName && motherSlug ? (
                <td>
                  <Link
                    className="has-text-danger"
                    to={`../${motherSlug}`}
                  >
                    {motherName}
                  </Link>
                </td>
              ) : (
                <td>{motherName || '-'}</td>
              )}

              {fatherName && fatherSlug ? (
                <td>
                  <Link to={`../${fatherSlug}`}>
                    {fatherName}
                  </Link>
                </td>
              ) : (
                <td>{fatherName || '-'}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
