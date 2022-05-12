import useBoolean from "./useBoolean"
import { renderHook, act } from "@testing-library/react-hooks"

describe("useBoolean", () => {
  test("toggles values", () => {
    const { result } = renderHook(() => useBoolean(false))
    const [, actions] = result.current

    expect(result.current[0]).toBe(false)

    act(actions.toggle)

    expect(result.current[0]).toBe(true)

    act(actions.toggle)

    expect(result.current[0]).toBe(false)
  })

  test("sets true", () => {
    const { result } = renderHook(() => useBoolean(false))
    const [, actions] = result.current

    expect(result.current[0]).toBe(false)

    act(actions.setTrue)

    expect(result.current[0]).toBe(true)
  })

  test("sets false", () => {
    const { result } = renderHook(() => useBoolean(true))
    const [, actions] = result.current

    expect(result.current[0]).toBe(true)

    act(actions.setFalse)

    expect(result.current[0]).toBe(false)
  })

  test("sets arbitrary value", () => {
    const { result } = renderHook(() => useBoolean(true))
    const [, actions] = result.current

    expect(result.current[0]).toBe(true)

    act(() => actions.setValue(false))

    expect(result.current[0]).toBe(false)
  })

  describe("hooks optimizations", () => {
    test("keeps actions reference equal after changing inner state", () => {
      const { result } = renderHook(() => useBoolean(true))
      const [, originalActionsReference] = result.current
      const { setFalse, setTrue, toggle, setValue } = originalActionsReference

      expect(result.current[1]).toBe(originalActionsReference)
      expect(result.current[1].setFalse).toBe(setFalse)
      expect(result.current[1].setTrue).toBe(setTrue)
      expect(result.current[1].toggle).toBe(toggle)
      expect(result.current[1].setValue).toBe(setValue)

      act(() => originalActionsReference.setFalse())

      expect(result.current[1]).toBe(originalActionsReference)
      expect(result.current[1].setFalse).toBe(setFalse)
      expect(result.current[1].setTrue).toBe(setTrue)
      expect(result.current[1].toggle).toBe(toggle)
      expect(result.current[1].setValue).toBe(setValue)
    })
  })
})
