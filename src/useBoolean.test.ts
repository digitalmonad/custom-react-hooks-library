import useBoolean from "./useBoolean"
import { renderHook, act } from "@testing-library/react-hooks"

describe("useBoolean", () => {
  test("toggles values", () => {
    // given
    const { result } = renderHook(() => useBoolean(false))
    const [, actions] = result.current

    expect(result.current[0]).toBe(false)

    // when
    act(actions.toggle)

    expect(result.current[0]).toBe(true)

    act(actions.toggle)

    // then
    expect(result.current[0]).toBe(false)
  })

  test("sets true", () => {
    // given
    const { result } = renderHook(() => useBoolean(false))
    const [, actions] = result.current

    expect(result.current[0]).toBe(false)

    // when
    act(actions.setTrue)

    // then
    expect(result.current[0]).toBe(true)
  })

  test("sets false", () => {
    // given
    const { result } = renderHook(() => useBoolean(true))
    const [, actions] = result.current

    expect(result.current[0]).toBe(true)

    // when
    act(actions.setFalse)

    // then
    expect(result.current[0]).toBe(false)
  })

  test("sets arbitrary value", () => {
    // given
    const { result } = renderHook(() => useBoolean(true))
    const [, actions] = result.current

    expect(result.current[0]).toBe(true)

    // when
    act(() => actions.setValue(false))

    // then
    expect(result.current[0]).toBe(false)
  })

  describe("hooks optimizations", () => {
    test("keeps actions reference equal after changing inner state", () => {
      // given
      const { result } = renderHook(() => useBoolean(true))
      const [, originalActionsReference] = result.current
      const { setFalse, setTrue, toggle, setValue } = originalActionsReference

      expect(result.current[1]).toBe(originalActionsReference)
      expect(result.current[1].setFalse).toBe(setFalse)
      expect(result.current[1].setTrue).toBe(setTrue)
      expect(result.current[1].toggle).toBe(toggle)
      expect(result.current[1].setValue).toBe(setValue)

      // when
      act(() => originalActionsReference.setFalse())

      // then
      expect(result.current[1]).toBe(originalActionsReference)
      expect(result.current[1].setFalse).toBe(setFalse)
      expect(result.current[1].setTrue).toBe(setTrue)
      expect(result.current[1].toggle).toBe(toggle)
      expect(result.current[1].setValue).toBe(setValue)
    })
  })
})
