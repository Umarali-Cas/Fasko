// components/Paggination.jsx
export const Paggination = ({ currentPage, totalCount, changePage, limit }) => {
  const totalPages = Math.ceil(totalCount / limit)

  if (totalPages <= 1) return null

  return (
    <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1
        return (
          <button
            key={page}
            onClick={() => changePage(page)}
            style={{
              padding: '8px 12px',
              background: currentPage === page ? 'black' : '#eee',
              color: currentPage === page ? 'white' : 'black',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {page}
          </button>
        )
      })}
    </div>
  )
}
