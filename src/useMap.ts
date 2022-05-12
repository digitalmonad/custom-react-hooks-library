import { useState, SetStateAction, useCallback, useMemo, Dispatch } from "react"

export type MapOrEntries<K, V> = Map<K, V> | [K, V][]

export type UseMapActions<K, V> = {
  set: (key: K, value: V) => void
  initialize: (pairsOrMap: MapOrEntries<K, V>) => void
  setValue: Dispatch<SetStateAction<Map<K, V>>>
  delete: (keyToRemove: K) => void
  clear: Map<K, V>["clear"]
}

export type UseMap<K, V> = [Map<K, V>, UseMapActions<K, V>]

export function useMap<K, V>(
  initialState: MapOrEntries<K, V> = new Map()
): UseMap<K, V> {
  const [map, setMap] = useState(
    Array.isArray(initialState) ? new Map(initialState) : initialState
  )

  const set = useCallback((key: K, value: V) => {
    setMap((aMap) => {
      const copy = new Map(aMap)
      copy.set(key, value)
      return copy
    })
  }, [])

  const deleteByKey = useCallback((key: K) => {
    setMap((_map) => {
      const copy = new Map(_map)
      copy.delete(key)
      return copy
    })
  }, [])

  const clear = useCallback(() => {
    setMap(() => new Map())
  }, [])

  const initialize = useCallback((mapOrTuple: MapOrEntries<K, V> = []) => {
    setMap(() => new Map(mapOrTuple))
  }, [])

  const actions = useMemo(
    () => ({
      setValue: setMap,
      clear,
      set,
      // TODO: To be removed in the next major release
      remove: deleteByKey,
      delete: deleteByKey,
      initialize,
    }),
    [clear, deleteByKey, initialize, set]
  )

  return [map, actions]
}

export default useMap
