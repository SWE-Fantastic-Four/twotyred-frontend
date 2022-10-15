import React from 'react'
import RouteCardLoading from './RouteCardLoading'

const RouteCardLoadingSet = () => {
  return (
    <>
      <RouteCardLoading />
      <RouteCardLoading className="tablet:block computer:block hidden" />
      <RouteCardLoading className="computer:block hidden"/>
    </>
  )
}

export default RouteCardLoadingSet
