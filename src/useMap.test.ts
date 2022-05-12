import { renderHook, act } from "@testing-library/react-hooks"
import useMap from "./useMap"

describe("useMap", () => {
  describe("seting values", () => {
    it("adds new value", () => {
      // given
      const { result } = renderHook(() => useMap<number, string>())
      const [, actions] = result.current
      expect(result.current[0].get(1)).toBeUndefined()
      // when
      act(() => actions.set(1, "added"))
      // then
      expect(result.current[0].get(1)).toBe("added")
    })
    test("updates old value", () => {
      // given
      const { result } = renderHook(() =>
        useMap<number, string>([[1, "default"]])
      )

      const [, actions] = result.current
      expect(result.current[0].get(1)).toBe("default")

      // when
      act(() => actions.set(1, "changed"))

      //then
      expect(result.current[0].get(1)).toBe("changed")
    })
  })

  describe("deleting values", () => {
    it("adds new value", () => {
      // given
      const { result } = renderHook(() => useMap<number, string>())
      const [, actions] = result.current
      expect(result.current[0].get(1)).toBeUndefined()
      // when
      act(() => actions.set(1, "added"))
      // then
      expect(result.current[0].get(1)).toBe("added")
    })
  })

  describe("initialize", () => {
    // if you are not familiar with this syntax, visit: https://jestjs.io/docs/api#testeachtablename-fn-timeout
    it.each`
      message    | input
      ${"map"}   | ${new Map([[1, "initialized"]])}
      ${"tuple"} | ${[[1, "initialized"]]}
    `("initializes with $message", ({ input }) => {
      // given
      const { result } = renderHook(() => useMap<number, string>())
      const [, actions] = result.current
      expect(result.current[0].get(1)).toBeUndefined()
      // when
      act(() => actions.initialize(input))
      // then
      expect(result.current[0].get(1)).toBe("initialized")
    })
  })

  describe("clear", () => {
    it("clears the map state and gets values", () => {
      // given
      const { result } = renderHook(() =>
        useMap<number, string>([[1, "initialized"]])
      )
      const [, actions] = result.current
      expect(result.current[0].get(1)).toBe("initialized")
      // when
      act(() => actions.clear())
      // then
      expect(result.current[0].get(1)).toBeUndefined()
    })
  })

  describe("hooks optimizations", () => {
    it("should change value reference equality after change", () => {
      // given
      const { result } = renderHook(() => useMap<number, number>())
      const [originalValueReference, actions] = result.current
      expect(result.current[0]).toBe(originalValueReference)
      // when
      act(() => actions.set(1, 1))
      // then
      expect(originalValueReference).not.toBe(result.current[0])
      expect(originalValueReference.get(1)).toBeUndefined()
      expect(result.current[0].get(1)).toBe(1)
    })
    it("should keep actions reference equality after value change", () => {
      // given
      const { result } = renderHook(() => useMap<number, number>())
      const [, originalActionsReference] = result.current
      expect(result.current[1]).toBe(originalActionsReference)
      // when
      act(() => originalActionsReference.set(1, 1))
      // then
      expect(originalActionsReference).toBe(result.current[1])
    })
  })
})
